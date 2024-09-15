import { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import styles from '../../styles/Login.module.css';

function Agendamentos() {
  const { user } = useContext(UserContext);
  const [atendimentos, setAtendimentos] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1); // Mês atual
  const [ano, setAno] = useState(new Date().getFullYear()); // Ano atual
  const navigate = useNavigate();

  useEffect(() => {
    const buscarAtendimentos = async () => {
      if (user) {
        console.log('Usuário logado:', user.id); // Verificar o ID do usuário logado

        try {
          const response = await axios.get('https://beauty-link-python.vercel.app/Atendimento', {
            params: { usuario: user.id } // Certifique-se de que o ID do usuário logado é passado corretamente
          });

          console.log('Atendimentos recebidos:', response.data);
          setAtendimentos(response.data);
        } catch (error) {
          console.error('Erro ao buscar atendimentos:', error.response ? error.response.data : error.message);
          window.alert('Erro ao buscar atendimentos. Por favor, tente novamente.');
        }
      }
    };

    buscarAtendimentos();
  }, [user]);

  // Função para verificar se o dia tem atendimento
  const isDiaOcupado = (diaAtual) => {
    return atendimentos.some((atendimento) => {
      const dataAtendimento = new Date(atendimento.DATA_ATENDIMENTO); 
      console.log('Comparando:', dataAtendimento, diaAtual); // Verificar as datas comparadas
      return (
        dataAtendimento.getDate() === diaAtual.getDate() &&
        dataAtendimento.getMonth() + 1 === mes &&
        dataAtendimento.getFullYear() === ano
      );
    });
  };
  

  // Gerar os dias do mês e destacar os dias com atendimento
  const gerarDiasDoMes = () => {
    const diasNoMes = new Date(ano, mes, 0).getDate(); // Obter número de dias no mês
    return Array.from({ length: diasNoMes }, (_, i) => {
      const dia = new Date(ano, mes - 1, i + 1); // Criar uma data para cada dia do mês
      const temAtendimento = isDiaOcupado(dia); // Verificar se o dia tem atendimento
      return (
        <div
          key={i}
          className={`p-2 border ${temAtendimento ? 'bg-success text-white' : 'bg-light'}`} // Destacar o dia com atendimento em verde
          style={{ width: '50px', height: '50px', display: 'inline-block', margin: '5px' }}
        >
          {i + 1}
        </div>
      );
    });
  };

  const quantidadeAtendimentos = atendimentos.length;
  const mensagemAtendimentos = quantidadeAtendimentos > 0
    ? `Você tem ${quantidadeAtendimentos} agendamento(s) encontrado(s).`
    : 'Nenhum agendamento encontrado.';

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

  return (
    <div>
      <Header />
      <div className={`${styles.body} min-vh-100 d-flex justify-content-center align-items-center`}>
        <div className="card p-4" style={{ width: '100%', maxWidth: '600px' }}>
          <div className="container mt-4">
            <h2>Seus Agendamentos</h2>
            <p className="text-white">{mensagemAtendimentos}</p>
            <div className="d-flex justify-content-between align-items-center my-3">
              <button className="btn btn-primary" onClick={irParaMesAnterior}>Anterior</button>
              <span>{`${mes}/${ano}`}</span>
              <button className="btn btn-primary" onClick={irParaMesProximo}>Próximo</button>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              {gerarDiasDoMes()}
            </div>
            <button
              className="btn btn-success mt-4"
              onClick={() => navigate('/Ponto')}
            >
              Ir para Agendamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agendamentos;
