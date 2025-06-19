import React, { useState, useEffect } from 'react';
import '../routes/PaginaInicial.css';

export default function PaginaInicial() {
  const [totalCidadaos, setTotalCidadaos] = useState(0);
  const [processosAtivos, setProcessosAtivos] = useState(0);
  const [prazosProximos, setPrazosProximos] = useState(0);
  const [publicacoesHoje, setPublicacoesHoje] = useState(0);

  useEffect(() => {
    setTotalCidadaos(5);
    setProcessosAtivos(14);
    setPrazosProximos(3);
    setPublicacoesHoje(2);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <section className="dashboard-section">
        <h2 className="section-title">Informações Gerais</h2>
        <div className="card-grid">
          <div className="card active-clients">
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
                <path d="M22 20c0 1.33-2.09 3-4 3s-4-1.67-4-3m4-10a4 4 0 0 0-4-4s-4 1.76-4 4"></path>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-value">{totalCidadaos}</span>
              <span className="card-label">Cidadãos Cadastrados</span>
            </div>
          </div>

          <div className="card active-processes">
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
                <path d="M6 14V4a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v10" />
                <path d="M2 14h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Z"></path>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-value">{processosAtivos}</span>
              <span className="card-label">Processos Ativos</span>
            </div>
          </div>

          <div className="card upcoming-deadlines">
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
                className="lucide lucide-calendar-check-2"
              >
                <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
                <path d="m18 22 3-3L22 16" />
                <path d="m18 16 3 3 1-1"></path>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-value">{prazosProximos}</span>
              <span className="card-label">Prazos Próximos</span>
            </div>
          </div>

          <div className="card today-publications">
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
                className="lucide lucide-book-open-text"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                <path d="M10 12H7" />
                <path d="M14 12h3"></path>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-value">{publicacoesHoje}</span>
              <span className="card-label">Publicações Hoje</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Agenda e Prazos Recentes</h2>
        <div className="info-box">
          <p>Não há prazos críticos para os próximos 7 dias.</p>
          <p>Últimas 5 movimentações processuais:</p>
          <ul>
            <li>Processo 2023-001: Publicação de despacho em 18/06/2025.</li>
            <li>Processo 2023-003: Recebimento de documento em 17/06/2025.</li>
            <li>
              Processo 2023-005: Agendamento de audiência para 01/07/2025.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
