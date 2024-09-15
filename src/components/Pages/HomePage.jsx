import Header from '../Header';
import '../../styles/Header.css'; // Importa o CSS do cabeçalho
import '../../styles/Home.css'; // Importa o CSS específico da HomePage

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
                <img src="https://i.pinimg.com/564x/32/22/24/322224f51e2d40e65ab270450bc0399e.jpg" className="d-block w-100" alt="Slide 1" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Primeira Imagem</h5>
                  <p>Descrição da primeira imagem.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="Slide 2" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Segunda Imagem</h5>
                  <p>Descrição da segunda imagem.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="Slide 3" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Terceira Imagem</h5>
                  <p>Descrição da terceira imagem.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Próximo</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

