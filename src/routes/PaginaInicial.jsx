import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../routes/PaginaInicial.css';
import { useCidadao } from '../contexts/CidadaoContext';
import { useProcesso } from '../contexts/ProcessoContext';

export default function PaginaInicial() {
  const { cidadaos } = useCidadao();
  const { processos } = useProcesso();
  const navigate = useNavigate();

  const totalCidadaos = cidadaos.length;
  
  const processosAtivos = processos.filter(
    (p) => p.situacao === 'Em andamento' || p.situacao === 'Suspenso'
  ).length;

  const totalReceber = processos
    .filter((p) => p.situacao !== 'Concluído')
    .reduce((acc, processo) => {
      const valor = parseFloat(processo.valor);
      if (isNaN(valor)) return acc;
      return acc + valor;
    }, 0);

  const handleClickCidadaos = () => {
    navigate('/cadastro-cidadao');
  };

  const handleClickProcessosCadastro = () => {
    navigate('/cadastro-processo');
  };

  const handleClickConsulta = () => {
    navigate('/consulta');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="info">
        <h2>Informações Gerais</h2>
        
        <div className="cards-info">
          <div className="card card-cidad" onClick={handleClickCidadaos}>
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users-round"
              >
                <path d="M18 21a8 8 0 0 0-16 0" />
                <circle cx="10" cy="8" r="5" />
                <path d="M22 21a8 8 0 0 0-16 0" />
                <path d="M16 2.02A5 5 0 0 0 18 8v10a2 2 0 0 0 2 2h3" />
              </svg>
            </div>
            <div className="card-conteudo">
              <span className="card-valor">{totalCidadaos}</span>
              <span className="card-legenda">Total de Cidadãos</span>
            </div>
          </div>

          <div className="card card-proc-ativos" onClick={handleClickConsulta}>
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-folder-open"
              >
                <path d="M6 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H8l-2-2z" />
                <path d="M10 12v6" />
                <path d="M13 15h6" />
              </svg>
            </div>
            <div className="card-conteudo">
              <span className="card-valor">{processosAtivos}</span>
              <span className="card-legenda">Processos Ativos</span>
            </div>
          </div>

          <div className="card card-total-receber" onClick={handleClickConsulta}>
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-dollar-sign"
              >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="card-conteudo">
              <span className="card-valor"> R${' '}
                {totalReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2,})}
              </span>
              <span className="card-legenda">Total a Receber</span>
            </div>
          </div>

          <div className="card card-novo-proc" onClick={handleClickProcessosCadastro}>
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-plus"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                <path d="M9 13h6"/>
                <path d="M12 10v6"/>
              </svg>
            </div>
            <div className="card-conteudo">
              <span className="card-valor"></span>
              <span className="card-legenda">Cadastrar Novo Processo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="agenda">
        <h2>Agenda e Prazos Recentes</h2>
        <div className="agenda-topico">
          <p>Não há prazos críticos para os próximos 7 dias.</p>
          <p>Últimas 5 movimentações processuais:</p>
          <ul>
            <li>Processo 2023-001 - Reunião agendada (18/07/2024)</li>
            <li>Processo 2023-003 - Documentos recebidos (15/07/2024)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
