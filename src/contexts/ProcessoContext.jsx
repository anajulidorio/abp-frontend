import { createContext, useContext, useState } from 'react';
import { jsPDF } from 'jspdf';
import { cidadaosIniciais } from './CidadaoContext';

const ProcessoContext = createContext();

function gerarPdfTeste() {
  const doc = new jsPDF();
  doc.text('teste', 10, 10);
  return doc.output('blob');
}

const processosPadrao = [
  {
    contribuinteId: cidadaosIniciais[0]?.id,
    numero: '2023-001',
    valor: '1500',
    situacao: 'Em andamento',
    arquivo: gerarPdfTeste(),
  },
  {
    contribuinteId: cidadaosIniciais[1]?.id,
    numero: '2023-002',
    valor: '3000',
    situacao: 'Concluído',
    arquivo: gerarPdfTeste(),
  },
];

export function ProcessoProvider({ children }) {
  const [processos, setProcessos] = useState(processosPadrao);

  const adicionarProcesso = (novo) => {
    setProcessos((prev) => [...prev, novo]);
  };

  const editarProcessoContext = (index, atualizado) => {
    const lista = [...processos];
    lista[index] = atualizado;
    setProcessos(lista);
  };

  const excluirProcessoContext = (index) => {
    setProcessos(processos.filter((_, i) => i !== index));
  };

  return (
    <ProcessoContext.Provider
      value={{ processos, adicionarProcesso, editarProcessoContext, excluirProcessoContext }}
    >
      {children}
    </ProcessoContext.Provider>
  );
}

export function useProcesso() {
  return useContext(ProcessoContext);
}
