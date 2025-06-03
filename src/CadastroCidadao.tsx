import React, { useState } from 'react';

const CadastroCidadao = () => {
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

  const [listaCidadaos, setListaCidadaos] = useState([]);

  function handleAlterar(evento) {
    const { name, value } = evento.target;
    setCidadao({ ...cidadao, [name]: value });
  }

  function salvar(evento) {
    evento.preventDefault();

    const cpfExiste = listaCidadaos.some((c) => c.cpf === cidadao.cpf);

    if (cpfExiste) {
      alert('CPF já cadastrado.');
      return;
    }

    setListaCidadaos([...listaCidadaos, cidadao]);
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
    alert('Cidadão cadastrado com sucesso!');
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Cadastro de Cidadãos</h1>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={botao}
        >
          {mostrarFormulario ? 'Cancelar' : 'Novo Cidadão'}
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} style={formulario}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={cidadao.nome}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={cidadao.cpf}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="date"
            name="dataNascimento"
            placeholder="Data de Nascimento"
            value={cidadao.dataNascimento}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={cidadao.email}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={cidadao.telefone}
            onChange={handleAlterar}
            style={campo}
          />

          <input
            type="text"
            name="ocupacao"
            placeholder="Ocupação (Profissão)"
            value={cidadao.ocupacao}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="text"
            name="logradouro"
            placeholder="Logradouro (Rua, Av, etc.)"
            value={cidadao.logradouro}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="text"
            name="numero"
            placeholder="Número"
            value={cidadao.numero}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="text"
            name="complemento"
            placeholder="Complemento"
            value={cidadao.complemento}
            onChange={handleAlterar}
            style={campo}
          />

          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={cidadao.bairro}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={cidadao.cidade}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={cidadao.estado}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <button type="submit" style={botao}>
            Salvar Cidadão
          </button>
        </form>
      )}

      <h2>Lista de Cidadãos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data Nasc.</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ocupação</th>
            <th>Endereço</th>
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
                {`${c.logradouro}, ${c.numero}${c.complemento ? ', ' + c.complemento : ''} - ${c.bairro}, ${c.cidade} - ${c.estado}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .container {
          max-width: 700px;
          margin: 0 auto;
          font-family: sans-serif;
          color: #333;
        }

        h1, h2 {
          text-align: center;
          color: #222;
          margin-bottom: 20px;
        }

        table {
          border: 1px solid #ccc;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-size: 14px;
        }

        thead {
          background-color: #444;
          color: white;
        }

        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        tbody tr:hover {
          background-color: #f5f5f5;
          cursor: default;
        }

        select, input[type="text"], input[type="number"], input[type="email"], input[type="date"] {
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.3s ease;
          font-size: 16px;
        }

        select:focus, input[type="text"]:focus, input[type="number"]:focus, input[type="email"]:focus, input[type="date"]:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0,123,255,.5);
        }

        button {
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #222;
        }
      `}</style>
    </div>
  );
};

const campo = {
  padding: '10px',
  marginBottom: '10px',
  fontSize: '16px',
};

const botao = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#444',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
};

const formulario = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  marginBottom: '20px',
  margin: '0 auto',
};

export default CadastroCidadao;
