import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/Login.module.css';
import { UserContext } from './UserContext';
import Header from '../Header';

function FormLogin() {
    const { setUser } = useContext(UserContext);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false); // Estado para indicar carregamento
    const navigate = useNavigate();

    // Função de login
    const Logar = async (e) => {
        e.preventDefault();

        if (!usuario || !senha) {
            window.alert('Por favor, insira o usuário e a senha.');
            return;
        }

        setLoading(true); // Ativa o estado de carregamento

        try {
            const response = await axios.post('https://beauty-link-python.vercel.app/Login', {
                usuario: usuario,
                senha: senha
            });

            console.log('Resposta da API:', response.data);

            if (response.data.message === 'Login bem-sucedido') {
                const userData = {
                    nome: usuario,
                    id: response.data.id_usuario
                };

                // Definindo o usuário no contexto apenas após o login ser bem-sucedido
                setUser(userData);
                // Armazenando o usuário no localStorage
                localStorage.setItem('user', JSON.stringify(userData));

                // Redireciona para a página de agendamento
                navigate("/Ponto");
            } else {
                window.alert('Usuário ou senha incorretos. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            window.alert('Usuário ou senha incorretos. Por favor, tente novamente.');
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    };

    // Navega para a página de cadastro
    const handleCadastro = () => {
        console.log("Usuário não possui cadastro");
        navigate("/Cadastro");
    };

    return (
        <div>
            <Header />
            <div className={styles.body}>
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
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Carregando...
                                    </>
                                ) : 'Entrar'}
                            </button>
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
        </div>
    );
}

export default FormLogin;
