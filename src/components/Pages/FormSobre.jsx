import Header from '../Header';
import styles from '../../styles/About.module.css';

const About = () => {
  return (
    <div>
      <Header />
      <div className={styles.body}>

      <div className="about-page container py-5">
        <div className="jumbotron bg-primary text-white text-center rounded mb-5">
          <h1 className="display-4">Sobre Nós</h1>
          <p className="lead">Descubra mais sobre o Beauty Link e nossa missão de oferecer os melhores serviços de beleza.</p>
        </div>

        <div className="row">
          {/* Card da empresa */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card shadow-lg h-100">
              <img
                src="/src/components/Imagens/salao.jpg"
                alt="Salão de Beleza"
                className="card-img-top"
                />
              <div className="card-body">
                <h2 className="card-title">Bem-vindo ao Beauty Link</h2>
                <p className="card-text">
                  No Beauty Link, nossa missão é proporcionar experiências únicas e personalizadas em cuidados de beleza.
                  Nosso salão é especializado em uma variedade de serviços como cortes, coloração, manicure, pedicure e tratamentos faciais.
                  Utilizamos produtos de alta qualidade e técnicas inovadoras para garantir que você se sinta ainda mais confiante.
                </p>
                <p className="card-text">
                  Nossa equipe de profissionais qualificados oferece o melhor atendimento em um ambiente acolhedor. Venha nos visitar e descubra o que podemos fazer por você!
                </p>
              </div>
            </div>
          </div>

          {/* Card da equipe */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card shadow-lg h-100">
              <div className="card-body text-center">
                <h2 className="card-title">Nossa Equipe</h2>
                <p className="card-text">
                  Conheça nossos especialistas, prontos para transformar o seu estilo com profissionalismo e dedicação.
                </p>
              </div>
              <div className="row text-center team-section px-4 py-3">
                <div className="col-md-4 mb-3">
                  <img
                    src="/src/components/Imagens/equipe1.jpg"
                    alt="Ana Clara"
                    className="img-fluid rounded-circle team-image"
                    />
                  <h5 className="mt-3">Braian Lincoln</h5>
                  <p>Especialista em Cabelos</p>
                </div>
                <div className="col-md-4 mb-3">
                  <img
                    src="/src/components/Imagens/equipe2.jpg"
                    alt="Lukas Silva"
                    className="img-fluid rounded-circle team-image"
                  />
                  <h5 className="mt-3">Lukas Silva</h5>
                  <p>Barbeiro e Estilista</p>
                </div>
                <div className="col-md-4 mb-3">
                  <img
                    src="/src/components/Imagens/equipe3.jpg"
                    alt="Juliana Santos"
                    className="img-fluid rounded-circle team-image"
                    />
                  <h5 className="mt-3">Ana Santos</h5>
                  <p>Manicure e Pedicure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                    </div>
  );
};

export default About;
