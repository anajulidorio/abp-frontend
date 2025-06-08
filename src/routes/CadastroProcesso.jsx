import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../routes/Cadastros.css';

const CadastroProcesso = () => {
  const contribuintes = [
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Santos' },
    { id: 3, nome: 'Pedro Oliveira' },
  ];

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [processo, setProcesso] = useState({
    contribuinteId: '',
    numero: '',
    valor: '',
    situacao: '',
  });
  const [listaProcessos, setListaProcessos] = useState([]);

  function handleAlterar(e) {
    const { name, value } = e.target;
    setProcesso({ ...processo, [name]: value });
  }

  function salvar(e) {
    e.preventDefault();
    if (listaProcessos.some((p) => p.numero === processo.numero)) {
      alert('Número de processo já cadastrado.');
      return;
    }
    setListaProcessos([...listaProcessos, processo]);
    setProcesso({ contribuinteId: '', numero: '', valor: '', situacao: '' });
    setMostrarFormulario(false);
    alert('Processo cadastrado com sucesso!');
  }

  return (
    <div className="pagina-processo">
      <h1 className="titulo-processo">Cadastro de Processos</h1>

      <div className="botao-novo-processo">
        <Button
          label={mostrarFormulario ? 'Cancelar' : 'Novo Processo'}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        />
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} className="formulario-processo">

          <select className="campo-formulario" name="contribuinteId" value={processo.contribuinteId} onChange={handleAlterar} required>
          <option value="">Selecione o contribuinte</option>
            {contribuintes.map(({ id, nome }) => (
              <option key={id} value={id}>
                {nome}
              </option>
            ))}
          </select>

          <Input className="campo-formulario" name="numero" placeholder="Número do processo" value={processo.numero} onChange={handleAlterar} required/>

          <Input className="campo-formulario" name="valor" type="number" placeholder="Valor (R$)" value={processo.valor} onChange={handleAlterar} required/>

          <select className="campo-formulario" name="situacao" value={processo.situacao} onChange={handleAlterar} required>
            <option value="">Selecione a situação</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Suspenso">Suspenso</option>
          </select>

          <Button type="submit" label="Salvar Processo" />
        </form>
      )}

      <h2 className="subtitulo-processo">Lista de Processos</h2>
      <table className="tabela-processos">
        <thead>
          <tr>
            <th>Contribuinte</th>
            <th>Número</th>
            <th>Valor</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {listaProcessos.map((proc, i) => {
            const contribuinte = contribuintes.find(
              (c) => c.id.toString() === proc.contribuinteId
            );
            return (
              <tr key={i}>
                <td>{contribuinte?.nome || '-'}</td>
                <td>{proc.numero}</td>
                <td>R$ {parseFloat(proc.valor).toFixed(2)}</td>
                <td>{proc.situacao}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroProcesso;
