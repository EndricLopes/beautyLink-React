import { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import styles from '../../styles/Agenda.module.css';

function Agendamentos() {
  const { user } = useContext(UserContext);
  const [atendimentos, setAtendimentos] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1); // Mês atual
  const [ano, setAno] = useState(new Date().getFullYear()); // Ano atual
  const [dataSelecionada, setDataSelecionada] = useState(''); // Data selecionada no calendário
  const [diaSelecionado, setDiaSelecionado] = useState(null); // Controle do dia selecionado no calendário
  const [tipoServico, setTipoServico] = useState('');
  const [observacao, setObservacao] = useState('');
  const [fkIdFuncionario, setFkIdFuncionario] = useState('');
  const [horarioAtendimento, setHorarioAtendimento] = useState(''); // Novo estado para o horário
  const navigate = useNavigate();

  // Redireciona para a página de login se o usuário não estiver logado
  useEffect(() => {
    if (!user) {
      navigate('/Login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const buscarAtendimentos = async () => {
      if (user) {
        try {
          const response = await axios.get('https://beauty-link-python.vercel.app/Atendimento', {
            params: { usuario: user.id }
          });

          console.log('Atendimentos recebidos:', response.data); // Mostrando os atendimentos recebidos
          setAtendimentos(response.data);
        } catch (error) {
          console.error('Erro ao buscar atendimentos:', error.response ? error.response.data : error.message);
          window.alert('Erro ao buscar atendimentos. Por favor, tente novamente.');
        }
      }
    };

    buscarAtendimentos();
  }, [user]);

  const isDiaOcupado = (diaAtual, horario) => {
    return atendimentos.some((atendimento) => {
      const dataAtendimento = new Date(atendimento.DATA_ATENDIMENTO);
      const horarioAtendimento = atendimento.HORARIO_ATENDIMENTO; // Verificação do horário
      return (
        dataAtendimento.getDate() === diaAtual.getDate() &&
        dataAtendimento.getMonth() === diaAtual.getMonth() &&
        dataAtendimento.getFullYear() === diaAtual.getFullYear() &&
        horarioAtendimento === horario // Comparação de horários
      );
    });
  };

  const gerarDiasDoMes = () => {
    const diasNoMes = new Date(ano, mes, 0).getDate();
    return Array.from({ length: diasNoMes }, (_, i) => {
      const dia = new Date(ano, mes - 1, i + 1);
      const temAtendimento = isDiaOcupado(dia);
      const isSelected = diaSelecionado === i + 1; // Verifica se é o dia selecionado

      return (
        <div
          key={i}
          onClick={() => {
            setDataSelecionada(dia.toISOString().split('T')[0]);
            setDiaSelecionado(i + 1); // Atualiza o dia selecionado
          }}
          className={`${styles.diaNormal} ${temAtendimento ? styles.diaOcupado : ''} ${isSelected ? styles.diaSelecionado : ''}`} // Aplica o estilo para dia ocupado e selecionado
        >
          {i + 1}
        </div>
      );
    });
  };

  const irParaMesAnterior = () => {
    if (mes === 1) {
      setMes(12);
      setAno(ano - 1);
    } else {
      setMes(mes - 1);
    }
  };

  const irParaMesProximo = () => {
    if (mes === 12) {
      setMes(1);
      setAno(ano + 1);
    } else {
      setMes(mes + 1);
    }
  };

  const handleFuncionarioChange = (e) => {
    setFkIdFuncionario(e.target.value);
  };

  const AgendarAtendimento = async (e) => {
    e.preventDefault();
    const dataMarcacao = new Date().toISOString().split('T')[0];
    const statusAgendamento = 'CADASTRADO';
    const fkIdUsuarioCliente = user ? user.id : '';

    try {
      const response = await axios.post('https://beauty-link-python.vercel.app/Ponto', {
        tipo_servico: tipoServico,
        data_atendimento: dataSelecionada,
        horario_atendimento: horarioAtendimento, // Inclua o horário aqui
        data_marcacao: dataMarcacao,
        status_agendamento: statusAgendamento,
        observacao: observacao,
        fk_id_funcionario: fkIdFuncionario,
        fk_id_usuario_cliente: fkIdUsuarioCliente
      });

      if (response.data.message === 'Atendimento cadastrado com sucesso') {
        window.alert('Atendimento cadastrado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      window.alert('Erro ao cadastrar atendimento. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className={`card p-4 ${styles.card}`} style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 className="text-center mb-4">Agenda</h2>

            <div className={styles.calendario}>
              {gerarDiasDoMes()}
            </div>

            <div className="d-flex justify-content-between align-items-center my-3">
              <button className="btn btn-primary" onClick={irParaMesAnterior}>Anterior</button>
              <span>{`${mes}/${ano}`}</span>
              <button className="btn btn-primary" onClick={irParaMesProximo}>Próximo</button>
            </div>

            {dataSelecionada && (
              <div className="mt-4">
                <h3>Agendar Atendimento para {dataSelecionada}</h3>
                <form onSubmit={AgendarAtendimento}>
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
                    </select>
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
                      onChange={handleFuncionarioChange}
                      required
                    >
                      <option value="">Selecione um funcionário</option>
                      <option value="5">Braian</option>
                      <option value="11">Lukas</option>
                      <option value="12">Ana</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="horarioAtendimento">Horário do Atendimento:</label>
                    <select
                      className="form-control"
                      id="horarioAtendimento"
                      value={horarioAtendimento}
                      onChange={(e) => setHorarioAtendimento(e.target.value)}
                      required
                    >
                      <option value="">Selecione um horário</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Confirmar Agendamento</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agendamentos;
