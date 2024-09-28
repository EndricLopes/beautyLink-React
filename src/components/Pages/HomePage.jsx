import Header from '../Header';
import '../../styles/Header.css'; // Importa o CSS do cabeçalho
import '../../styles/Home.css'; // Importa o CSS específico da HomePage
import mulher1 from '../Imagens/mulher1.jpg';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <div className="carousel-container">
          <div id="carouselExampleCaptions" className="carousel slide custom-carousel" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={mulher1} className="d-block w-100" alt="Cabelo e Estilo" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Transforme seu Estilo</h5>
                  <p>Cuidados profissionais com o cabelo para um visual impecável.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://i.pinimg.com/564x/b3/f1/76/b3f176bf83c1a8d307607b8d6a3c0f3e.jpg" className="d-block w-100" alt="Unhas e Beleza" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Unhas Perfeitas</h5>
                  <p>Deixe suas unhas impecáveis com nossos serviços de manicure e pedicure.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://i.pinimg.com/564x/ed/19/4b/ed194b405d160e889b63f1ff3eec6f0d.jpg" className="d-block w-100" alt="Maquiagem Profissional" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Maquiagem Perfeita</h5>
                  <p>Realce sua beleza natural com nossas maquiagens personalizadas.</p>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Anterior</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Próximo</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
