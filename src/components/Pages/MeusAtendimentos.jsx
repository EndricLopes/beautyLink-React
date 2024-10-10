import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import Header from '../Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/Login.module.css';
import maquiagem from '../Imagens/maquiagem.jpg';
import unha from '../Imagens/unha.jpg';
import cabelo from '../Imagens/cabelo.jpg';

function MeusAtendimentos() {
  const { user } = useContext(UserContext);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`https://beauty-link-python.vercel.app/MeusAtendimentos?id_usuario=${user.id}`)
        .then(response => {
          setAtendimentos(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar atendimentos:', error);
          setLoading(false);
        });
    }
  }, [user]);

  const getImageForService = (service) => {
    const lowerCaseService = service.trim().toLowerCase();

    if (lowerCaseService.includes('maquiagem')) {
      return maquiagem;
    } else if (lowerCaseService.includes('cabelo') || lowerCaseService.includes('corte')) {
      return cabelo;
    } else if (lowerCaseService.includes('unha') || lowerCaseService.includes('manicure')) {
      return unha;
    } else {
      return cabelo;
    }
  };

  const cancelarAtendimento = async (id) => {
    try {
      const response = await axios.put(`https://beauty-link-python.vercel.app/CancelarAtendimento`, { id });
      if (response.data.message === 'Atendimento cancelado com sucesso') {
        // Atualizar a lista de atendimentos após o cancelamento
        setAtendimentos(atendimentos.map(atendimento =>
          atendimento.ID_AGENDA === id
            ? { ...atendimento, STATUS_AGENDAMENTO: 'CANCELADO' }
            : atendimento
        ));
        alert('Atendimento cancelado com sucesso.');
      } else {
        alert('Erro ao cancelar atendimento.');
      }
    } catch (error) {
      console.error('Erro ao cancelar atendimento:', error);
      alert('Erro ao cancelar atendimento. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.body}>
          <div className="container text-center">
            <div className="mt-5">
              <h2>Carregando seus atendimentos...</h2>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className="container mt-4">
          <h2 className="text-center bg-light">Meus Atendimentos</h2>

          {atendimentos.length === 0 ? (
            <p className="text-center mt-4">Você não possui nenhum atendimento marcado.</p>
          ) : (
            <div className="row">
              {atendimentos.map(atendimento => (
                <div className="col-md-4" key={atendimento.ID_AGENDA}>
                  <div className="card mb-3 h-100">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={getImageForService(atendimento.TIPO_SERVICO)}
                          className="img-fluid rounded-start card-img-fit"
                          alt={atendimento.TIPO_SERVICO}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{atendimento.TIPO_SERVICO}</h5>
                          <p className="card-text">Data do Atendimento: <br />{atendimento.DATA_ATENDIMENTO}</p>
                          <p className="card-text"><small className="text-muted">Status: {atendimento.STATUS_AGENDAMENTO}</small></p>
                          <p className="card-text"><small className="text-muted">Funcionário: {atendimento.FUNCIONARIO}</small></p>
                          {atendimento.STATUS_AGENDAMENTO !== 'CANCELADO' && (
                            <button className="btn btn-danger mt-2" onClick={() => cancelarAtendimento(atendimento.ID_AGENDA)}>Cancelar</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MeusAtendimentos;
