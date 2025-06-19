import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../routes/Cadastros.css';

const CadastroCidadao = () => {
  const cidadaosPadrao = [
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
      cidade: 'São Paulo',
      estado: 'SP',
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
      bairro: 'Copacabana',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
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
      bairro: 'Savassi',
      cidade: 'Belo Horizonte',
      estado: 'MG',
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
      bairro: 'Água Verde',
      cidade: 'Curitiba',
      estado: 'PR',
    },
    {
      nome: 'Carlos Eduardo',
      cpf: '555.555.555-55',
      dataNascimento: '1995-03-25',
      email: 'carlos.eduardo@example.com',
      telefone: '51954321098',
      ocupacao: 'Estudante',
      logradouro: 'Av. E',
      numero: '1213',
      complemento: 'Bloco A, Apto 202',
      bairro: 'Moinhos de Vento',
      cidade: 'Porto Alegre',
      estado: 'RS',
    },
  ];

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cidadao, setCidadao] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    ocupacao: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [listaCidadaos, setListaCidadaos] = useState(cidadaosPadrao);
  const [indiceEdicao, setIndiceEdicao] = useState(null);

  function handleAlterar(e) {
    const { name, value } = e.target;
    setCidadao({ ...cidadao, [name]: value });
  }

  function salvar(e) {
    e.preventDefault();

    const cpfExiste = listaCidadaos.some(
      (c, i) => c.cpf === cidadao.cpf && i !== indiceEdicao
    );

    if (cpfExiste) {
      window.alert('CPF já cadastrado.');
      return;
    }

    if (indiceEdicao !== null) {
      const listaAtualizada = [...listaCidadaos];
      listaAtualizada[indiceEdicao] = cidadao;
      setListaCidadaos(listaAtualizada);
      window.alert('Cidadão editado com sucesso!');
    } else {
      setListaCidadaos([...listaCidadaos, cidadao]);
      window.alert('Cidadão cadastrado com sucesso!');
    }

    setCidadao({
      nome: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      telefone: '',
      ocupacao: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
    setMostrarFormulario(false);
    setIndiceEdicao(null);
  }

  function editarCidadao(index) {
    setCidadao(listaCidadaos[index]);
    setIndiceEdicao(index);
    setMostrarFormulario(true);
  }

  function excluirCidadao(index) {
    if (window.confirm('Tem certeza que deseja excluir este cidadão?')) {
      const novaLista = listaCidadaos.filter((_, i) => i !== index);
      setListaCidadaos(novaLista);
      window.alert('Cidadão excluído com sucesso!');
    }
  }

  return (
    <div className="pagina-cadastro">
      <h1 className="titulo-cadastro">Cadastro de Cidadãos</h1>

      <div className="botao-novo-cidadao">
        <Button
          label={mostrarFormulario ? 'Cancelar' : 'Novo Cidadão'}
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setCidadao({
              nome: '',
              cpf: '',
              dataNascimento: '',
              email: '',
              telefone: '',
              ocupacao: '',
              logradouro: '',
              numero: '',
              complemento: '',
              bairro: '',
              cidade: '',
              estado: '',
            });
            setIndiceEdicao(null);
          }}
        />
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} className="formulario-cidadao">
          <Input
            name="nome"
            placeholder="Nome completo"
            value={cidadao.nome}
            onChange={handleAlterar}
            required
          />
          <Input
            name="cpf"
            placeholder="CPF"
            value={cidadao.cpf}
            onChange={handleAlterar}
            required
          />
          <Input
            name="dataNascimento"
            type="date"
            value={cidadao.dataNascimento}
            onChange={handleAlterar}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={cidadao.email}
            onChange={handleAlterar}
            required
          />
          <Input
            name="telefone"
            placeholder="Telefone"
            value={cidadao.telefone}
            onChange={handleAlterar}
          />
          <Input
            name="ocupacao"
            placeholder="Ocupação"
            value={cidadao.ocupacao}
            onChange={handleAlterar}
            required
          />
          <Input
            name="logradouro"
            placeholder="Logradouro"
            value={cidadao.logradouro}
            onChange={handleAlterar}
            required
          />
          <Input
            name="numero"
            placeholder="Número"
            value={cidadao.numero}
            onChange={handleAlterar}
            required
          />
          <Input
            name="complemento"
            placeholder="Complemento"
            value={cidadao.complemento}
            onChange={handleAlterar}
          />
          <Input
            name="bairro"
            placeholder="Bairro"
            value={cidadao.bairro}
            onChange={handleAlterar}
            required
          />
          <Input
            name="cidade"
            placeholder="Cidade"
            value={cidadao.cidade}
            onChange={handleAlterar}
            required
          />
          <Input
            name="estado"
            placeholder="Estado"
            value={cidadao.estado}
            onChange={handleAlterar}
            required
          />
          <Button
            type="submit"
            label={indiceEdicao !== null ? 'Salvar Edição' : 'Salvar Cidadão'}
          />
        </form>
      )}

      <h2 className="subtitulo-cidadaos">Lista de Cidadãos</h2>
      <table className="tabela-cidadaos">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data Nasc.</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ocupação</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaCidadaos.map((c, i) => (
            <tr key={i}>
              <td>{c.nome}</td>
              <td>{c.cpf}</td>
              <td>{c.dataNascimento}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
              <td>{c.ocupacao}</td>
              <td>
                {`${c.logradouro}, ${c.numero}${
                  c.complemento ? ', ' + c.complemento : ''
                } - ${c.bairro}, ${c.cidade} - ${c.estado}`}
              </td>
              <td>
                <Button label="Editar" onClick={() => editarCidadao(i)} />
                <Button label="Excluir" onClick={() => excluirCidadao(i)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroCidadao;
