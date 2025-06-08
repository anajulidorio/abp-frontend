import Menu from '../components/Menu';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="pagina-layout">
      <Menu />
      <main className="conteudo-principal">
        <Outlet />
      </main>
    </div>
  );
}
