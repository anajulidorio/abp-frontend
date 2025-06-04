import React, { useState } from "react";

const CadastroProcesso = () => {
  const contribuintes = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Santos" },
    { id: 3, nome: "Pedro Oliveira" },
  ];

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [processo, setProcesso] = useState({
    contribuinteId: "",
    numero: "",
    valor: "",
    situacao: "",
  });

  const [listaProcessos, setListaProcessos] = useState([]);

  function handleAlterar(evento) {
    const { name, value } = evento.target;
    setProcesso({ ...processo, [name]: value });
  }

  function salvar(evento) {
    evento.preventDefault();

    const jaExiste = listaProcessos.some(
      (p) => p.numero === processo.numero
    );

    if (jaExiste) {
      alert("Número de processo já cadastrado.");
      return;
    }

    setListaProcessos([...listaProcessos, processo]);
    setProcesso({
      contribuinteId: "",
      numero: "",
      valor: "",
      situacao: "",
    });
    setMostrarFormulario(false);
    alert("Processo cadastrado com sucesso!");
  }

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Cadastro de Processos</h1>

      <div style={{ textAlign: "center" }}>
        <button onClick={() => setMostrarFormulario(!mostrarFormulario)} style={botao}>
          {mostrarFormulario ? "Cancelar" : "Novo Processo"}
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} style={formulario}>
          <select
            name="contribuinteId"
            value={processo.contribuinteId}
            onChange={handleAlterar}
            required
            style={campo}
          >
            <option value="">Selecione o contribuinte</option>
            {contribuintes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="numero"
            placeholder="Número do processo"
            value={processo.numero}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <input
            type="number"
            name="valor"
            placeholder="Valor devido (R$)"
            value={processo.valor}
            onChange={handleAlterar}
            required
            style={campo}
          />

          <select
            name="situacao"
            value={processo.situacao}
            onChange={handleAlterar}
            required
            style={campo}
          >
            <option value="">Selecione a situação</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Suspenso">Suspenso</option>
          </select>

          <button type="submit" style={botao}>
            Salvar Processo
          </button>
        </form>
      )}

      <h2>Lista de Processos</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                <td>{contribuinte?.nome || "-"}</td>
                <td>{proc.numero}</td>
                <td>R$ {parseFloat(proc.valor).toFixed(2)}</td>
                <td>{proc.situacao}</td>
              </tr>
            );
          })}
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

        select, input[type="text"], input[type="number"] {
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }

        select:focus, input[type="text"]:focus, input[type="number"]:focus {
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
  padding: "10px",
  marginBottom: "10px",
  fontSize: "16px",
};

const botao = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#444",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "10px",
};

const formulario = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  marginBottom: "20px",
  margin: "0 auto", // também centraliza o formulário
};

export default CadastroProcesso;
