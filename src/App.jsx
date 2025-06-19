import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'; 

import RootLayout from './layouts/RootLayout';
import PaginaInicial from './routes/PaginaInicial';
import Login from './routes/Login';
import CadastroCidadao from './routes/CadastroCidadao';
import CadastroProcesso from './routes/CadastroProcesso';
import Consulta from './routes/Consulta';

export default function App() {
  const [mostrarLogin, setMostrarLogin] = useState(true);

  const aoAvancar = () => {
    setMostrarLogin(false);
  };

  const roteador = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <PaginaInicial /> },
        {
          path: 'login',
          element: mostrarLogin ? (
            <Login aoAvancar={aoAvancar} />
          ) : (
            <Navigate to="/" replace />
          ),
        },
        { path: 'cadastro-cidadao', element: <CadastroCidadao /> },
        { path: 'cadastro-processo', element: <CadastroProcesso /> },
        { path: 'consulta', element: <Consulta /> },
      ],
    },
  ]);

  if (mostrarLogin) {
    return <Login aoAvancar={aoAvancar} />;
  }

  return <RouterProvider router={roteador} />;
}
