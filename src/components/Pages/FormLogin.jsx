import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/Login.module.css'; // Atualize para importar CSS Module
import { UserContext } from './UserContext';

function FormLogin() {
    const { setUser } = useContext(UserContext);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(savedUser);
        }
    }, [setUser]);

    const Logar = (e) => {
        e.preventDefault();

        if (!usuario || !senha) {
            window.alert('Por favor, insira o usuário e a senha.');
            return;
        }

        axios.post('https://beauty-link-python.vercel.app/Login', {
            usuario: usuario,
            senha: senha
        })
        .then((response) => {
            console.log(response.data.message);
            setUser(usuario);
            console.log('Usuário definido:', usuario);
            localStorage.setItem('user', usuario);
            navigate("/Ponto");
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            window.alert('Usuário ou senha incorretos. Por favor, tente novamente.');
        });
    }

    const handleCadastro = () => {
        console.log("Usuário não possui cadastro");
        navigate("/Cadastro");
    }

    return (
        <div className={styles.body}> {/* Use a classe do CSS Module */}
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <h1 className="text-center mb-4">Login</h1>
                    <form onSubmit={Logar}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="usuario">Usuário:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="usuario"
                                name="usuario"
                                placeholder="Crie seu nome de usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Crie sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Entrar</button>
                        <div className="mt-3 text-center">
                            <p className="mb-0">Ainda não possui cadastro?</p>
                            <button type="button" className="btn btn-secondary mt-2" onClick={handleCadastro}>
                                Criar Cadastro
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;
