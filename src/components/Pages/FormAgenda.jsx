import { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import styles from '../../styles/Agenda.module.css';
import { format, isSameDay, parseISO, startOfDay } from 'date-fns';

function Agendamentos() {
  const { user } = useContext(UserContext);
  const [atendimentos, setAtendimentos] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1); // Mês atual
  const [ano, setAno] = useState(new Date().getFullYear()); // Ano atual
  const [dataSelecionada, setDataSelecionada] = useState(''); // Data selecionada no calendário
  const [diaSelecionado, setDiaSelecionado] = useState(null); // Controle do dia selecionado no calendário
  const [tipoServico, setTipoServico] = useState('');
  const [observacao, setObservacao] = useState('');
  const [fkIdFuncionario, setFkIdFuncionario] = useState(''); // Funcionario selecionado
  const [horarioAtendimento, setHorarioAtendimento] = useState(''); // Horário selecionado
  const [loadingAtendimentos, setLoadingAtendimentos] = useState(true); // Loading para busca de atendimentos
  const [loadingCadastro, setLoadingCadastro] = useState(false); // Loading para cadastro de atendimento
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
        setLoadingAtendimentos(true);
        try {
          const response = await axios.get('https://beauty-link-python.vercel.app/Atendimento', {
            params: { usuario: user.id }
          });

          console.log('Atendimentos recebidos:', response.data);
          setAtendimentos(response.data);
        } catch (error) {
          console.error('Erro ao buscar atendimentos:', error.response ? error.response.data : error.message);
          window.alert('Erro ao buscar atendimentos. Por favor, tente novamente.');
        }
        setLoadingAtendimentos(false);
      }
    };

    buscarAtendimentos();
  }, [user]);

  // Função para verificar se algum horário no dia está ocupado
  const algumHorarioOcupado = (diaAtual) => {
    return atendimentos.some((atendimento) => {
      const dataAtendimento = startOfDay(parseISO(atendimento.DATA_ATENDIMENTO));
      return isSameDay(dataAtendimento, startOfDay(diaAtual));
    });
  };

  // Função para verificar se todos os horários do dia estão ocupados
  const todosHorariosOcupados = (diaAtual) => {
    const horarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    const atendimentosNoDia = atendimentos.filter((atendimento) => {
      const dataAtendimento = startOfDay(parseISO(atendimento.DATA_ATENDIMENTO));
      return isSameDay(dataAtendimento, startOfDay(diaAtual));
    });

    const horariosOcupados = horarios.filter((horario) => {
      return atendimentosNoDia.some((atendimento) => {
        const horarioAtendimento = format(parseISO(atendimento.DATA_ATENDIMENTO), 'HH:mm');
        return horarioAtendimento === horario && atendimento.FK_ID_USUARIO_CLIENTE !== user.id;
      });
    });

    return horariosOcupados.length === horarios.length;
  };

  // Função para gerar os dias do mês
  const gerarDiasDoMes = () => {
    const diasNoMes = new Date(ano, mes, 0).getDate(); // Calcula o número de dias no mês atual
    return Array.from({ length: diasNoMes }, (_, i) => {
      const dia = new Date(ano, mes - 1, i + 1); // Gera a data de cada dia no calendário
      const ocupado = todosHorariosOcupados(dia); // Verifica se todos os horários do dia estão ocupados
      const parcialmenteOcupado = algumHorarioOcupado(dia); // Verifica se algum horário do dia está ocupado
      const isSelected = diaSelecionado === i + 1;

      return (
        <div
          key={i}
          onClick={() => {
            if (!ocupado) {
              setDataSelecionada(dia.toISOString().split('T')[0]); // Define a data selecionada
              setDiaSelecionado(i + 1); // Atualiza o dia selecionado para abrir o formulário
            }
          }}
          className={`${styles.diaNormal} ${ocupado ? styles.diaOcupado : ''} ${
            parcialmenteOcupado && !ocupado ? styles.diaParcialmenteOcupado : ''
          } ${isSelected ? styles.diaSelecionado : ''}`}
          style={{ opacity: ocupado ? 0.5 : 1, pointerEvents: ocupado ? 'none' : 'auto' }}
        >
          {i + 1}
        </div>
      );
    });
  };

  // Função para gerar os horários disponíveis para o funcionário escolhido
  const gerarHorariosDisponiveis = () => {
    const horarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    return horarios.map((horario) => {
      const ocupado = atendimentos.some((atendimento) => {
        const dataAtendimento = format(parseISO(atendimento.DATA_ATENDIMENTO), 'yyyy-MM-dd');
        const horarioAtendimento = format(parseISO(atendimento.DATA_ATENDIMENTO), 'HH:mm');
        const funcionarioAtendimento = atendimento.FK_ID_FUNCIONARIO; // Funcionario do atendimento

        // Verifica se o horário já está ocupado pelo mesmo funcionário
        return (
          dataAtendimento === dataSelecionada &&
          horarioAtendimento === horario &&
          funcionarioAtendimento === parseInt(fkIdFuncionario, 10) // Compara o funcionário
        );
      });

      return (
        <option key={horario} value={horario} disabled={ocupado}>
          {horario}
        </option>
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
    setFkIdFuncionario(e.target.value); // Atualiza o funcionário selecionado
  };

  const AgendarAtendimento = async (e) => {
    e.preventDefault();
    setLoadingCadastro(true);
    const dataMarcacao = new Date().toISOString().split('T')[0]; // Data atual
    const statusAgendamento = 'CADASTRADO';
    const fkIdUsuarioCliente = user ? user.id : '';

    // Combina a data selecionada com o horário selecionado
    const dataAtendimentoComHorario = `${dataSelecionada} ${horarioAtendimento}:00`;

    try {
      const response = await axios.post('https://beauty-link-python.vercel.app/Ponto', {
        tipo_servico: tipoServico,
        data_atendimento: dataAtendimentoComHorario,  // Enviando a data com o horário selecionado
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
    setLoadingCadastro(false);
};

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className={`card p-4 ${styles.card}`} style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 className="text-center mb-4">Seus Agendamentos</h2>

            {loadingAtendimentos ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.calendario}>{gerarDiasDoMes()}</div>

                <div className="d-flex justify-content-between align-items-center my-3">
                  <button className="btn btn-primary" onClick={irParaMesAnterior}>
                    Anterior
                  </button>
                  <span>{`${mes}/${ano}`}</span>
                  <button className="btn btn-primary" onClick={irParaMesProximo}>
                    Próximo
                  </button>
                </div>
              </>
            )}

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
                      <option value="2">Lukas</option>
                      <option value="3">Ana</option>
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
                      {gerarHorariosDisponiveis()}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={loadingCadastro}>
                    {loadingCadastro ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="ms-2">Carregando...</span>
                      </>
                    ) : (
                      'Confirmar Agendamento'
                    )}
                  </button>
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
