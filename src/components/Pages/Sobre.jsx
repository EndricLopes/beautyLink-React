import Header from '../Header';
import '../../styles/About.css'; // Importa o CSS específico para a página "Sobre"

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-page container">
        <h1 className="text-center my-5">Sobre Nós</h1>
        <div className="row">
          <div className="col-md-6">
            <img
              src="/src/components/Imagens/salao.jpg"
              alt="Salão de Beleza"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h2>Bem-vindo ao Beauty Link</h2>
            <p>
              No Beauty Link, nossa missão é proporcionar experiências únicas e personalizadas em cuidados de beleza.
              Nosso salão de beleza é especializado em uma variedade de serviços, desde cortes e coloração de cabelo
              até manicure, pedicure e tratamentos faciais. Utilizamos produtos de alta qualidade e técnicas inovadoras
              para garantir que você saia se sentindo ainda mais confiante e radiante.
            </p>
            <p>
              Nossa equipe de profissionais é altamente qualificada e está sempre pronta para oferecer o melhor serviço.
              Valorizamos cada cliente e nos esforçamos para criar um ambiente acolhedor e relaxante, onde você possa
              aproveitar ao máximo o seu tempo conosco.
            </p>
            <p>
              Venha nos visitar e descubra o que podemos fazer por você. Estamos aqui para ajudar a realçar a sua
              beleza natural.
            </p>
          </div>
        </div>
        <div className="row team-section my-5">
          <h2 className="text-center mb-4">Nossa Equipe</h2>
          <div className="col-md-4 text-center">
            <img
              src="/src/components/Imagens/equipe1.jpg"
              alt="Profissional 1"
              className="img-fluid rounded-circle mb-3"
            />
            <h5>Ana Clara</h5>
            <p>Especialista em Cabelos e Maquiagem</p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="/src/components/Imagens/equipe2.jpg"
              alt="Profissional 2"
              className="img-fluid rounded-circle mb-3"
            />
            <h5>Lukas Silva</h5>
            <p>Barbeiro e Estilista</p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="/src/components/Imagens/equipe3.jpg"
              alt="Profissional 3"
              className="img-fluid rounded-circle mb-3"
            />
            <h5>Juliana Santos</h5>
            <p>Manicure e Pedicure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
