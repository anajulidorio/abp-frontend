import React, { useState } from 'react';
import '../routes/Consulta.css';
import { useProcesso } from '../contexts/ProcessoContext';
import { useCidadao } from '../contexts/CidadaoContext';

export default function Consulta() {
  const [textoBusca, setTextoBusca] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');

  const { processos } = useProcesso();
  const { cidadaos } = useCidadao();

  const statusDisponiveis = ['Todos', 'Em andamento', 'Concluído', 'Suspenso'];

  const listaFiltrada = processos.filter((proc) => {
    const contribuinte = cidadaos.find(c => c.id === proc.contribuinteId);

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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                Nenhum processo encontrado.
              </td>
            </tr>
          ) : (
            listaFiltrada.map((proc, i) => {
              const pessoa = cidadaos.find(c => c.id === proc.contribuinteId);
              return (
                <tr key={i}>
                  <td>{pessoa ? pessoa.nome : '-'}</td>
                  <td>{proc.numero}</td>
                  <td>R$ {parseFloat(proc.valor).toFixed(2)}</td>
                  <td>{proc.situacao}</td>
                  <td>
                    <button
                      className="botao-icone"
                      onClick={() => {
                        if (proc.arquivo) {
                          const url = URL.createObjectURL(proc.arquivo);
                          window.open(url, '_blank');
                        } else {
                          alert('Nenhum arquivo disponível.');
                        }
                      }}
                    >
                      📄
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
