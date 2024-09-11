// src/components/Header.js
import '../styles/Header.css'; // Importa o CSS do cabeçalho
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
//  const navigate = useNavigate();

//  const linkLogin = () => {
//    navigate('/Login');
//  };

  return (
  <div>
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Beauty Link</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">Sobre</Nav.Link>
            <Nav.Link href="#contact">Agendamento</Nav.Link>
            <Nav.Link href="#contact">Contatos</Nav.Link>
            <Nav.Link href="#link">Equipes</Nav.Link>
            <Nav.Link href="#link">Equipes</Nav.Link>
            <Nav.Link href="#link">Equipes</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
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