import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Cadastro.module.css'; // Atualize para importar o CSS Module

function Cadastro() {
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', usuario: '', email: '', senha: '' });
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const navigate = useNavigate();

  const handleCriarUsuario = async () => {
    if (novoUsuario.senha !== confirmaSenha) {
      alert('As senhas não correspondem!');
      return;
    }

    try {
      const response = await axios.post('https://beauty-link-python.vercel.app/cadastro', novoUsuario);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.body}> {/* Utilize a classe de estilo CSS Module */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className={`card p-4 ${styles.card}`} style={{ width: '100%', maxWidth: '400px' }}>
          <h1 className="text-center mb-4">Tela Cadastro</h1>
          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Nome:</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Digite o seu nome..."
                value={novoUsuario.nome}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="usuario">Usuário:</label>
              <input
                className="form-control"
                type="text"
                name="usuario"
                placeholder="Crie seu nome de usuário..."
                value={novoUsuario.usuario}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, usuario: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Digite seu email..."
                value={novoUsuario.email}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Senha:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Crie sua senha..."
                value={novoUsuario.senha}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="confirmaSenha">Confirme sua senha:</label>
              <input
                className="form-control"
                type="password"
                name="confirmaSenha"
                placeholder="Confirme sua senha..."
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleCriarUsuario}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
