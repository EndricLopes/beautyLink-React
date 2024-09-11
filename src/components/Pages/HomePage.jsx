// src/pages/HomePage.js
import { useState, useEffect } from 'react';
import Header from '../Header';
import '../../styles/Header.css'; // Importa o CSS do cabeçalho
import '../../styles/Home.css'; // Importa o CSS específico da HomePage

// Importa a imagem como uma variável

// Slider Component
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const slides = [
    "https://static.wixstatic.com/media/41d000_9d0c9989e0019030a1f87f1fef20dbfc.jpg",
    "https://static.wixstatic.com/media/9c608a_f7f89260104a4c60bc3f0102dff6abe7.jpg",
    "https://static.wixstatic.com/media/9c608a_9c51c19c1d514c499674324ef25c482a.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="slider">
      <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={currentSlide === index ? "active" : ""}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
      <div className="info-overlay">
        <h2>Conecte-se com Sua Estética111</h2>
        <p>Agende seu atendimento com nossos especialistas e descubra o melhor para você.</p>
        <button>Agende agora</button>
      </div>
    </div>
  );
};

// ProductBar Component
const ProductBar = () => {
  return (
    <div className="product-bar">
      <div className="product-item">
        <img src="https://via.placeholder.com/300x200" alt="Produto 1" />
        <p>Produto 1</p>
      </div>
      <div className="product-item">
        <img src="https://via.placeholder.com/300x200" alt="Produto 2" />
        <p>Produto 2</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <Slider />
        <ProductBar />
      </main>
    </div>
  );
};

export default HomePage;
