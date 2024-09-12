import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import styles from '../../styles/Agenda.module.css'; // Atualize para importar o CSS Module
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // Importa o componente de calendário

function ConfirmAcao({ mensagem, onConfirm, onCancel }) {
    return (
        <div className={styles.alertConfirm}> {/* Use a classe do CSS Module */}
            <div className={styles.modalContent}>
                <p>{mensagem}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.styleConfirmaPonto} onClick={onConfirm}>Confirmar</button>
                    <button className={styles.styleConfirmaPontoFechar} onClick={onCancel}>Fechar</button>
                </div>
            </div>
        </div>
    );
}

// Definição das propTypes para ConfirmAcao
ConfirmAcao.propTypes = {
    mensagem: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

function FormAgenda() {
    const { user } = useContext(UserContext);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);
    const [tipoServico, setTipoServico] = useState('');
    const [dataAtendimento, setDataAtendimento] = useState('');
    const [dataMarcacao, setDataMarcacao] = useState('');
    const [observacao, setObservacao] = useState('');
    const [fkIdFuncionario, setFkIdFuncionario] = useState('');
    const [diasOcupados, setDiasOcupados] = useState([]); // Estado para os dias ocupados
    const navigate = useNavigate();

    useEffect(() => {
        // Definindo a data de marcação como a data atual
        const hoje = new Date().toISOString().split('T')[0];
        setDataMarcacao(hoje);

        // Buscar os funcionários
        axios.get('https://beauty-link-python.vercel.app/funcionarios')
            .then(response => {
                setFuncionarios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar funcionários:', error);
                window.alert('Erro ao carregar lista de funcionários. Por favor, tente novamente.');
            });

        // Buscar os atendimentos para atualizar o calendário
        axios.get('https://beauty-link-python.vercel.app/atendimentos')
            .then(response => {
                setDiasOcupados(response.data.map(date => new Date(date)));
            })
            .catch(error => {
                console.error('Erro ao buscar atendimentos:', error);
                window.alert('Erro ao carregar atendimentos. Por favor, tente novamente.');
            });
    }, []);

    const linkLogin = () => {
        navigate('/');
    };

    const AgendarAtendimento = (e) => {
        e.preventDefault();

        axios.post('https://beauty-link-python.vercel.app/CadastroAtendimento', {
            tipo_servico: tipoServico,
            data_atendimento: dataAtendimento,
            data_marcacao: dataMarcacao,
            status_agendamento: 'CADASTRADO', // Valor padrão para o status
            observacao: observacao,
            fk_id_funcionario: fkIdFuncionario,
            fk_id_usuario_cliente: user?.id // Passa o ID do usuário da sessão
        }, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === 'Atendimento cadastrado com sucesso') {
                    window.alert('Atendimento cadastrado com sucesso!');
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error('Erro ao cadastrar atendimento:', error);
                window.alert('Erro ao cadastrar atendimento. Por favor, tente novamente.');
            });
    };

    const tileClassName = ({ date }) => {
        // Verifica se a data está na lista de dias ocupados
        return diasOcupados.some(dia => dia.toDateString() === date.toDateString()) ? styles.diaOcupado : null;
    };

    return (
        <div className={styles.body}> {/* Use a classe do CSS Module */}
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className={`card p-4 ${styles.card}`} style={{ width: '100%', maxWidth: '600px' }}>
                    <h1 className="text-center mb-4">Agende seu Atendimento</h1>

                    {/* Calendário */}
                    <div className="mb-4">
                        <Calendar
                            tileClassName={tileClassName} // Adiciona a classe para os dias ocupados
                            onChange={(date) => setDataAtendimento(date.toISOString().split('T')[0])} // Atualiza a data de atendimento
                            value={new Date(dataAtendimento)}
                        />
                    </div>

                    <form onSubmit={AgendarAtendimento}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="usuario">Usuário:</label>
                            <p className={styles.fakeInput}>{user?.name}</p> {/* Exibe o nome do usuário */}
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="tipoServico">Tipo de Serviço:</label>
                            <select
                                id="tipoServico"
                                className="form-control"
                                value={tipoServico}
                                onChange={(e) => setTipoServico(e.target.value)}
                                required
                            >
                                <option value="">Selecione um serviço</option>
                                <option value="1">Corte de Cabelo</option>
                                <option value="2">Pintura de Unhas</option>
                                <option value="3">Hidratação Capilar</option>
                                <option value="4">Maquiagem</option>
                                <option value="5">Depilação</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="dataAtendimento">Data do Atendimento:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataAtendimento"
                                value={dataAtendimento}
                                onChange={(e) => setDataAtendimento(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="dataMarcacao">Data da Marcação:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataMarcacao"
                                value={dataMarcacao}
                                readOnly // Campo apenas leitura
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="observacao">Observação:</label>
                            <textarea
                                className="form-control"
                                id="observacao"
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="fkIdFuncionario">Funcionário:</label>
                            <select
                                id="fkIdFuncionario"
                                className="form-control"
                                value={fkIdFuncionario}
                                onChange={(e) => setFkIdFuncionario(e.target.value)}
                                required
                            >
                                <option value="">Selecione um funcionário</option>
                                {funcionarios.map(funcionario => (
                                    <option key={funcionario.id} value={funcionario.id}>
                                        {funcionario.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="container__ponto__button">
                            <button type="submit" className="btn btn-primary w-100">Confirmar Agendamento</button>
                        </div>

                        <div className="mt-3 text-center">
                            <p className="mb-0">Deseja ir para a página de login?</p>
                            <button type="button" className="btn btn-secondary w-100" onClick={linkLogin}>Login</button>
                        </div>
                    </form>
                </div>
            </div>

            {mostrarModal && (
                <ConfirmAcao
                    mensagem={`Você confirma este agendamento?`}
                    onConfirm={() => { AgendarAtendimento(); setMostrarModal(false); }}
                    onCancel={() => setMostrarModal(false)}
                />
            )}
        </div>
    );
}

export default FormAgenda;
