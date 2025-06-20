import React, { useState } from 'react';
import '../routes/Consulta.css';

const contribuintes = [
  { id: 1, nome: 'João Silva' },
  { id: 2, nome: 'Maria Santos' },
  { id: 3, nome: 'Pedro Oliveira' },
  { id: 4, nome: 'Ana Pereira' },
  { id: 5, nome: 'Carlos Eduardo' },
  { id: 6, nome: 'Fernanda Lima' },
];

const processosPadrao = [
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

export default function Consulta() {
  const [filtro, setFiltro] = useState('');

  const processosFiltrados = processosPadrao.filter((proc) => {
    const contribuinte = contribuintes.find(
      (c) => c.id.toString() === proc.contribuinteId
    );
    const nome = contribuinte?.nome.toLowerCase() || '';
    const numero = proc.numero.toLowerCase();
    const filtroLower = filtro.toLowerCase();

    return nome.includes(filtroLower) || numero.includes(filtroLower);
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Consultas</h1>
      <div className="texto-consulta">
        <p>
          Consulte processos por nome do contribuinte ou número do processo.
        </p>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Digite nome ou número para buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="input-busca"
        />
      </div>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ borderCollapse: 'collapse', width: '100%' }}
      >
        <thead>
          <tr>
            <th>Contribuinte</th>
            <th>Número</th>
            <th>Valor (R$)</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {processosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                Nenhum processo encontrado.
              </td>
            </tr>
          ) : (
            processosFiltrados.map((proc, i) => {
              const contribuinte = contribuintes.find(
                (c) => c.id.toString() === proc.contribuinteId
              );
              return (
                <tr key={i}>
                  <td>{contribuinte?.nome || '-'}</td>
                  <td>{proc.numero}</td>
                  <td>{parseFloat(proc.valor).toFixed(2)}</td>
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
