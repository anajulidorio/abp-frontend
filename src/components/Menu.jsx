import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <nav className="menu">
        <Link to="/">Início</Link>
        <Link to="/cadastro-cidadao">Cadastrar Cidadão</Link>
        <Link to="/cadastro-processo">Cadastrar Processo</Link>
        <Link to="/consulta">Consulta de Processos</Link>
      </nav>

      <style>
        {`
          .menu {
            background-color: #f0f0f0;
            padding: 16px;
            display: flex;
            justify-content: center;
            gap: 20px;
            font-family: sans-serif;
            font-size: 16px;
            font-weight: 500;
          }

          .menu a {
            text-decoration: none;
            color: #333;
            padding: 8px 12px;
            border-radius: 6px;
            transition: background 0.2s;
          }

          .menu a:hover {
            background-color: #ddd;
            color: #000;
          }
        `}
      </style>
    </div>
  );
}
