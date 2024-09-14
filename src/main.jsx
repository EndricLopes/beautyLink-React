/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import reactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App';
import FormLogin from './components/Pages/FormLogin';
import FormCadastro from './components/Pages/FormCadastro';
import FormAgenda from './components/Pages/FormAgenda';
import './index.css'
import PageError from './components/Pages/PageError';
import EspelhoPonto from './components/Pages/EspelhoPonto';
import HomePage from './components/Pages/HomePage';
import Produtos from './components/Pages/Produtos';
import FormContato from './components/Pages/FormContato';

const Rotas=createBrowserRouter([
    { path: "/", 
    element: <App/>,
    errorElement: <PageError/>,
    children: [
        {
        path:"/Login", 
        element: <FormLogin/>
        },
        {
        path:"/Cadastro", 
        element: <FormCadastro/>
        },
        {
        path:"/Ponto", 
        element:<FormAgenda/>
        },
        {
        path:"/Espelho", 
        element:<EspelhoPonto/>
        },
        {
        path:"/Produto", 
        element:<Produtos/>
        },
        {
        path:"/Contato", 
        element:<FormContato/>
        },
        {
        path:"/", 
        element:<HomePage/>
        }
      ],
    },
]);

reactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={Rotas}/>
    </React.StrictMode>
);