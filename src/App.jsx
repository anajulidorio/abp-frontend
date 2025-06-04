import './App.css';
import CadastroProcesso from './routes/CadastroProcesso';
import CadastroCidadao from './routes/CadastroCidadao';

function App() {
  return (
    <div className="App">
      <h1>Fiscallis</h1>

      <CadastroCidadao />
      <CadastroProcesso />
    </div>
  );
}

export default App;
