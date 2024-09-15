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
    if (user) {
      axios
        .get('https://beauty-link-python.vercel.app/Atendimento', {
          params: { usuario: user.id },
        })
        .then((response) => {
          setAtendimentos(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar atendimentos:', error.response ? error.response.data : error.message);
        });
    }
  }, [user]);

  const isDiaOcupado = (data) => {
    return atendimentos.some((atendimento) => atendimento.DATA_ATENDIMENTO === data);
  };

  const gerarDiasDoMes = () => {
    const diasNoMes = new Date(ano, mes, 0).getDate(); // Obter número de dias no mês
    return Array.from({ length: diasNoMes }, (_, i) => {
      const dia = `${ano}-${mes.toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`;
      const temAtendimento = isDiaOcupado(dia);
      return (
        <div
          key={i}
          className={`p-2 border ${temAtendimento ? 'bg-sucess text-white' : 'bg-light'}`}
          style={{ width: '50px', height: '50px', display: 'inline-block', margin: '5px'
          }}
        >
          {i + 1}
        </div>
      );
    });
  };

  const quantidadeAtendimentos = atendimentos.length;
  const mensagemAtendimentos = quantidadeAtendimentos > 0 ? `Você tem ${quantidadeAtendimentos} agendamento(s) encontrado(s).` : 'Nenhum agendamento encontrado.';

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
