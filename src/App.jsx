import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import PaginaInicial from './routes/PaginaInicial';
import Login from './routes/Login'
import CadastroCidadao from './routes/CadastroCidadao';
import CadastroProcesso from './routes/CadastroProcesso';
import Consulta from './routes/Consulta';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <PaginaInicial /> },
      { path: 'login', element: <Login /> },
      { path: 'cadastro-cidadao', element: <CadastroCidadao /> },
      { path: 'cadastro-processo', element: <CadastroProcesso /> },
      { path: 'consulta', element: <Consulta /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
