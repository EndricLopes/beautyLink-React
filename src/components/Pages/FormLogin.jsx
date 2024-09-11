import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Styles.css';
import { UserContext } from './UserContext';

function FormLogin() {
    const { setUser } = useContext(UserContext);
    const [usuario, setUsuario] = useState('');
    const [senha, setPassword] = useState('');
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
            return; }

        axios.post('https://beauty-link-python.vercel.app/Login', {
            usuario: usuario,
            senha: senha
        })
        .then((response) => {
            console.log(response.data.message);
            setUser(usuario);
            console.log('usuario definido:', usuario);
            localStorage.setItem('user', usuario);
            navigate("/Ponto");
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            window.alert('Usuario ou senha incorretos. Por favor, tente novamente.');
        });
    }

    const handleCadastro = () => {
        console.log("Usuário não possui cadastro")
        return navigate("/Cadastro");
    }

    return(
        <div className="wrap-login">
            <h1 className="login-form-title">Tela de Login</h1>
            <form onSubmit={Logar}>
                <div>
                    <label className="title-label-usuario" htmlFor="usuario">Usuario: </label>

                    <input className="input" type="text"
                    id="usuario" 
                    name="usuario" 
                    placeholder="Crie seu nome de usuario"
                    onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div>
                    <label className="title-label-senha" htmlFor="password">Senha: </label>

                    <input className="input" type="password"
                    id="password"
                    name="password" 
                    placeholder="Crie sua senha"
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input className="style-entrar" type="submit" value="Entrar" />
                </div>
                <div>
                    <p className="style-pergunta">Ainda não possui cadastro?</p>
                    <button className="style-criar-cadastro" onClick={handleCadastro}>Criar Cadastro</button>
                </div>
            </form>
        </div >
    )
}

export default FormLogin;