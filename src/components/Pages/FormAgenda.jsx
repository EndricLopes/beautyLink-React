import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Adicione esta linha
import { UserContext } from './UserContext';
import axios from 'axios';
import styles from '../../styles/Agenda.module.css'; // Atualize para importar o CSS Module
import { useNavigate } from 'react-router-dom';

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

ConfirmAcao.propTypes = {
    mensagem: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

function FormAgenda() {
    const { user } = useContext(UserContext);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);
    const [atendimentos, setAtendimentos] = useState([]);
    const [tipoServico, setTipoServico] = useState('');
    const [dataAtendimento, setDataAtendimento] = useState('');
    const [dataMarcacao] = useState(new Date().toISOString().split('T')[0]); // Data atual
    const [statusAgendamento] = useState('CADASTRADO'); // Status fixo
    const [observacao, setObservacao] = useState('');
    const [fkIdFuncionario, setFkIdFuncionario] = useState('');
    const [fkIdUsuarioCliente] = useState(user ? user.id : ''); // ID do usuário logado
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar os funcionários
        axios.get('https://beauty-link-python.vercel.app/Funcionarios')
            .then(response => setFuncionarios(response.data))
            .catch(error => console.error('Erro ao buscar funcionários:', error));

        // Buscar os atendimentos
        axios.get('https://beauty-link-python.vercel.app/Atendimentos', {
            params: { tipo_servico: tipoServico }
        })
        .then(response => setAtendimentos(response.data))
        .catch(error => console.error('Erro ao buscar atendimentos:', error));
    }, [tipoServico]);

    const AgendarAtendimento = (e) => {
        e.preventDefault();

        axios.post('https://beauty-link-python.vercel.app/CadastroAtendimento', {
            tipo_servico: tipoServico,
            data_atendimento: dataAtendimento,
            data_marcacao: dataMarcacao,
            status_agendamento: statusAgendamento,
            observacao: observacao,
            fk_id_funcionario: fkIdFuncionario,
            fk_id_usuario_cliente: fkIdUsuarioCliente
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

    const isDiaOcupado = (data) => {
        return atendimentos.some(atendimento => atendimento.DATA_ATENDIMENTO === data);
    };

    return (
        <div className={styles.body}> {/* Use a classe do CSS Module */}
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className={`card p-4 ${styles.card}`} style={{ width: '100%', maxWidth: '400px' }}>
                    <h1 className="text-center mb-4">Agende seu Atendimento</h1>
                    <form onSubmit={AgendarAtendimento}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="usuario">Usuário:</label>
                            <p className={styles.fakeInput}>{user ? user.nome : 'Não autenticado'}</p>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="tipoServico">Tipo de Serviço:</label>
                            <select
                                className="form-control"
                                id="tipoServico"
                                value={tipoServico}
                                onChange={(e) => setTipoServico(e.target.value)}
                                required
                            >
                                <option value="">Selecione um serviço</option>
                                <option value="cabelo">Cabelo</option>
                                <option value="unha">Unha</option>
                                <option value="maquiagem">Maquiagem</option>
                                {/* Adicione mais opções conforme necessário */}
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
                                readOnly
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
                                className="form-control"
                                id="fkIdFuncionario"
                                value={fkIdFuncionario}
                                onChange={(e) => setFkIdFuncionario(e.target.value)}
                                required
                            >
                                <option value="">Selecione um funcionário</option>
                                {funcionarios.map((funcionario) => (
                                    <option key={funcionario.ID_FUNCIONARIO} value={funcionario.ID_FUNCIONARIO}>
                                        {funcionario.NOME_FUNCIONARIO}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="container__ponto__button">
                            <button type="submit" className="btn btn-primary w-100">Confirmar Agendamento</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={styles.calendario}>
                {/* Renderize o calendário aqui */}
                {Array.from({ length: 30 }, (_, i) => {
                    const dia = `2024-09-${i + 1}`;
                    return (
                        <div
                            key={i}
                            className={isDiaOcupado(dia) ? styles.diaOcupado : styles.diaNormal}
                        >
                            {i + 1}
                        </div>
                    );
                })}
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
