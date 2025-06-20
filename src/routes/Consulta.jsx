import React, { useState } from 'react';
import '../routes/Consulta.css';

export default function Consulta() {
  const [textoBusca, setTextoBusca] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');

  const contribuintes = [
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Santos' },
    { id: 3, nome: 'Pedro Oliveira' },
    { id: 4, nome: 'Ana Pereira' },
    { id: 5, nome: 'Carlos Eduardo' },
    { id: 6, nome: 'Fernanda Lima' },
  ];

  const processos = [
    {
      contribuinteId: '1',
      numero: '2023-001',
      valor: '1500',
      situacao: 'Em andamento',
    },
    {
      contribuinteId: '2',
      numero: '2023-002',
      valor: '3000',
      situacao: 'Concluído',
    },
    {
      contribuinteId: '4',
      numero: '2023-003',
      valor: '2200',
      situacao: 'Suspenso',
    },
    {
      contribuinteId: '5',
      numero: '2023-004',
      valor: '1800',
      situacao: 'Em andamento',
    },
    {
      contribuinteId: '6',
      numero: '2023-005',
      valor: '2500',
      situacao: 'Concluído',
    },
  ];

  const statusDisponiveis = ['Todos', 'Em andamento', 'Concluído', 'Suspenso'];

  const listaFiltrada = processos.filter((proc) => {
    const contribuinte = contribuintes.find(
      (c) => c.id.toString() === proc.contribuinteId
    );
    const nomeContribuinte = contribuinte
      ? contribuinte.nome.toLowerCase()
      : '';
    const numeroProcesso = proc.numero.toLowerCase();
    const busca = textoBusca.toLowerCase();

    const combinaComTexto =
      nomeContribuinte.includes(busca) || numeroProcesso.includes(busca);
    const combinaComStatus =
      statusSelecionado === 'Todos' || proc.situacao === statusSelecionado;

    return combinaComTexto && combinaComStatus;
  });

  return (
    <div className="pagina-consulta">
      <h1 className="titulo-consulta">Consultas</h1>
      <p className="texto-consulta">Consulte processos por nome ou número:</p>

      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar nome ou número..."
          value={textoBusca}
          onChange={(e) => setTextoBusca(e.target.value)}
          className="input-busca"
        />
      </div>

      <div className="botoes-situacao">
        {statusDisponiveis.map((status) => (
          <button
            key={status}
            className={statusSelecionado === status ? 'ativo' : ''}
            onClick={() => setStatusSelecionado(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Contribuinte</th>
            <th>Número</th>
            <th>Valor</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada.length === 0 ? (
            <tr>
              <td colSpan="4">Nenhum processo encontrado.</td>
            </tr>
          ) : (
            listaFiltrada.map((proc, i) => {
              const pessoa = contribuintes.find(
                (c) => c.id.toString() === proc.contribuinteId
              );
              return (
                <tr key={i}>
                  <td>{pessoa ? pessoa.nome : '-'}</td>
                  <td>{proc.numero}</td>
                  <td>R$ {parseFloat(proc.valor).toFixed(2)}</td>
                  <td>{proc.situacao}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
