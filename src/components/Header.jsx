// src/components/Header.js
import '../styles/Header.css'; // Importa o CSS do cabeçalho
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const linkLogin = () => {
    navigate('/Login');
  };

  return (
    <header className="bg-info fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <div className="navbar-nav mx-auto">
          <button className="btn btn-link nav-item nav-link text-white">Home</button>
          <button className="btn btn-link nav-item nav-link text-white">Sobre</button>
          <button className="btn btn-link nav-item nav-link text-white">Contato</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
