import '../styles/Header.css'; // Importa o CSS do cabeçalho
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react'; // Importa o hook useContext
import { UserContext } from './Pages/UserContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Acessa o usuário e a função para definir o usuário

  const linkLogin = () => {
    navigate('/Login');
  };
  
  const linkCadastro = () => {
    navigate('/Cadastro');
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

  const linkSobre = () => {
    navigate('/Sobre');
  };

  const linkMeusAtendimentos = () => {
    if (!user) {
      // Se não houver um usuário logado, redireciona para a página de login
      navigate('/Login');
    } else {
      // Se o usuário estiver logado, redireciona para Meus Atendimentos
      navigate('/MeusAtendimentos');
    }
  };

  const handleLogout = () => {
    // Remove o usuário do contexto e limpa o localStorage
    setUser(null);
    localStorage.removeItem('user');
    navigate('/Login'); // Redireciona para a página de login após o logout
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" onClick={linkHome}>Beauty Link</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home" onClick={linkHome}>Home</Nav.Link>
              <Nav.Link href="#about" onClick={linkSobre}>Sobre</Nav.Link>
              <Nav.Link href="#contact" onClick={linkAgendamento}>Agenda</Nav.Link>
              <Nav.Link href="#contact" onClick={linkMeusAtendimentos}>Meus Atendimentos</Nav.Link>
              <Nav.Link href="#contact" onClick={linkContato}>Contatos</Nav.Link>
              <Nav.Link href="#link" onClick={linkProduto}>Loja</Nav.Link>

              {/* Mostra "Conecte-se" apenas se o usuário não estiver logado */}
              {!user && (
                <NavDropdown title="Conecte-se" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={linkLogin}>Login</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" onClick={linkCadastro}>Cadastro</NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Mostra o botão de logout apenas se o usuário estiver logado */}
              {user && (
                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
