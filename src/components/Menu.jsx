import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <nav className="menu">
        <Link to="/">Início</Link>
        <Link to="/cadastro-cidadao">Cadastro de Cidadãos</Link>
        <Link to="/cadastro-processo">Cadastro de Processos</Link>
        <Link to="/consulta">Consulta de Processos</Link>
      </nav>
    </div>
  );
}
