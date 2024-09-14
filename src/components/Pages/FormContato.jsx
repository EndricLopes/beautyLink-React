import React from 'react';
import "../../styles/Contato.css";

const FormContato = () => {
    return (
        <div className="contact-container">
            <div className="side-bar">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <div className="brand">Beauty Link</div>
                <div className="social-icons">
                    <img src="https://github.com/weleyt13/beautylink/blob/main/-facebook_square.png?raw=true" alt="Facebook" />
                    <img src="https://github.com/weleyt13/beautylink/blob/main/-twitter.png?raw=true" alt="Twitter" />
                    <img src="https://github.com/weleyt13/beautylink/blob/main/-instagram.png?raw=true" alt="Instagram" />
                </div>
            </div>

            <div className="image-bar">
                <img src="https://github.com/weleyt13/beautylink/blob/main/Rectangle%205.png?raw=true" alt="Imagem 1" />
            </div>

            <div className="image-bar">
                <img src="https://github.com/weleyt13/beautylink/blob/main/Rectangle%201.png?raw=true" alt="Imagem 2" />
            </div>

            <div className="contact-form">
                <h3>Nos Contacte</h3>
                <div className="contact-info">
                    <p><strong>Telefone:</strong> (61) 99456-9635</p>
                    <p><strong>Email:</strong> beautylink@gmail.com</p>
                </div>
                <form>
                    <input type="text" className="form-control" placeholder="Nome" required />
                    <input type="email" className="form-control" placeholder="Email" required />
                    <textarea className="form-control" rows="4" placeholder="Mensagem" required></textarea>
                    <button type="submit" className="btn btn-custom btn-block">Mandar Mensagem</button>
                </form>
            </div>
        </div>
    );
}

export default FormContato;
