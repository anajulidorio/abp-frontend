import { createContext, useContext, useState, useRef } from 'react';

const CidadaoContext = createContext();

const gerarCidadaosIniciaisComId = (baseId = 1) => {
  const cidadaos = [
    {
      nome: 'João Silva',
      cpf: '111.111.111-11',
      dataNascimento: '1980-01-15',
      email: 'joao.silva@example.com',
      telefone: '11987654321',
      ocupacao: 'Engenheiro',
      logradouro: 'Rua A',
      numero: '123',
      complemento: 'Apto 101',
      bairro: 'Centro',
      cidade: 'Forquilhinha',
      estado: 'SC',
    },
    {
      nome: 'Maria Santos',
      cpf: '222.222.222-22',
      dataNascimento: '1992-05-20',
      email: 'maria.santos@example.com',
      telefone: '21998765432',
      ocupacao: 'Médica',
      logradouro: 'Av. B',
      numero: '456',
      complemento: '',
      bairro: 'Vila Lurdes',
      cidade: 'Forquilhinha',
      estado: 'SC',
    },
    {
      nome: 'Pedro Oliveira',
      cpf: '333.333.333-33',
      dataNascimento: '1975-11-03',
      email: 'pedro.oliver@example.com',
      telefone: '31976543210',
      ocupacao: 'Advogado',
      logradouro: 'Rua C',
      numero: '789',
      complemento: 'Casa',
      bairro: 'Ouro Negro',
      cidade: 'Forquilhinha',
      estado: 'SC',
    },
    {
      nome: 'Ana Pereira',
      cpf: '444.444.444-44',
      dataNascimento: '1988-08-10',
      email: 'ana.pereira@example.com',
      telefone: '41965432109',
      ocupacao: 'Designer',
      logradouro: 'Rua D',
      numero: '1011',
      complemento: '',
      bairro: 'Vila Franca',
      cidade: 'Forquilhinha',
      estado: 'SC',
    },
    {
      nome: 'Carlos Eduardo Vieira',
      cpf: '555.555.555-55',
      dataNascimento: '1995-03-25',
      email: 'carlos.eduardo@example.com',
      telefone: '51954321098',
      ocupacao: 'Estudante',
      logradouro: 'Av. E',
      numero: '1213',
      complemento: 'Bloco A, Apto 202',
      bairro: 'Santa Líbera',
      cidade: 'Forquilhinha',
      estado: 'SC',
    },
  ];

  return cidadaos.map((c, index) => ({ ...c, id: baseId + index }));
};

export const cidadaosIniciais = gerarCidadaosIniciaisComId();

export function CidadaoProvider({ children }) {
  const [cidadaos, setCidadaos] = useState(cidadaosIniciais);

  const proximoIdRef = useRef(cidadaosIniciais.length > 0 ? cidadaosIniciais[cidadaosIniciais.length - 1].id + 1 : 1);

  const adicionarCidadao = (novo) => {
    const novoCidadaoComId = { ...novo, id: proximoIdRef.current };
    proximoIdRef.current += 1;
    setCidadaos((prev) => [...prev, novoCidadaoComId]);
  };

  const editarCidadaoContext = (id, atualizado) => {
    setCidadaos((prevCidadaos) =>
      prevCidadaos.map((c) => (c.id === id ? { ...atualizado, id: c.id } : c))
    );
  };

  const excluirCidadaoContext = (id) => {
    setCidadaos((prevCidadaos) => prevCidadaos.filter((c) => c.id !== id));
  };

  return (
    <CidadaoContext.Provider
      value={{ cidadaos, adicionarCidadao, editarCidadaoContext, excluirCidadaoContext }}
    >
      {children}
    </CidadaoContext.Provider>
  );
}

export function useCidadao() {
  return useContext(CidadaoContext);
}
