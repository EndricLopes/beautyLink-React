// src/components/Header.js
import '../styles/Header.css'; // Importa o CSS do cabeçalho
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const linkLogin = () => {
    navigate('/Login');
  };

  return (
    <header className="header">
      <nav>
        <button className="nav-button">Sobre</button>
        <button className="nav-button">Agendamentos</button>
        <button className="nav-button">Equipes</button>
        <button className="nav-button">Contato</button>
        <button className="nav-button" onClick={linkLogin}>Login</button>
        <button className="nav-button">Cadastro</button>
      </nav>
    </header>
  );
};

export default Header;