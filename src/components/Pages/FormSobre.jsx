/* eslint-disable no-unused-vars */
// Sobre.jsx
import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center sobre-container">
      <div className="card sobre-card text-center p-3">
        <div className="row no-gutters">
          <div className="col-md-4 d-none d-md-block sobre-image">
            <img
              src="https://via.placeholder.com/300x500" // substitua pela imagem real
              alt="Sobre"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center p-4">
            <h3 className="card-title">Sobre Nós</h3>
            <p className="card-text">
              Somos uma equipe dedicada a trazer o melhor serviço para nossos clientes. Nossa missão é proporcionar excelência em tudo o que fazemos.
            </p>
            <p className="card-text">
              Desde nossa fundação, focamos em qualidade e atendimento personalizado, conquistando a confiança e a satisfação de nossos clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
