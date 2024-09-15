// src/components/Header.js
import '../styles/Header.css'; // Importa o CSS do cabeçalho
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const navigate = useNavigate();

  const linkLogin = () => {
    navigate('/Login');
  };
  
  const linkProduto = () => {
    navigate('/Produto');
  };

  
  const linkHome = () => {
    navigate('/');
  };

  
  const linkAgendamento = () => {
    navigate('/Agendamentos');
  };

  const linkContato = () => {
    navigate('/Contato');
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" onClick={linkHome}>Beauty Link</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about" onClick={linkContato}>Sobre</Nav.Link>
              <Nav.Link href="#contact" onClick={linkAgendamento}>Agendamento</Nav.Link>
              <Nav.Link href="#contact" onClick={linkContato}>Contatos</Nav.Link>
              <Nav.Link href="#link">Equipes</Nav.Link>
              <Nav.Link href="#link" onClick={linkProduto}>Estoque</Nav.Link>


              <NavDropdown title="Conecte-se" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onClick={linkLogin}>Login</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Cadastro</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
