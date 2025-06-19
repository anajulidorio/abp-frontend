import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../routes/Cadastros.css';

const CadastroProcesso = () => {
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

  // Inicializa a lista com os processos padrão (sem usar localStorage)
  const [listaProcessos, setListaProcessos] = useState(processosPadrao);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [indiceEdicao, setIndiceEdicao] = useState(null);
  const [processo, setProcesso] = useState({
    contribuinteId: '',
    numero: '',
    valor: '',
    situacao: '',
  });

  function handleAlterar(e) {
    const { name, value } = e.target;
    setProcesso({ ...processo, [name]: value });
  }

  function salvar(e) {
    e.preventDefault();

    if (
      listaProcessos.some(
        (p, i) => p.numero === processo.numero && i !== indiceEdicao
      )
    ) {
      alert('Número de processo já cadastrado.');
      return;
    }

    if (indiceEdicao !== null) {
      const listaAtualizada = [...listaProcessos];
      listaAtualizada[indiceEdicao] = processo;
      setListaProcessos(listaAtualizada);
      alert('Processo editado com sucesso!');
    } else {
      setListaProcessos([...listaProcessos, processo]);
      alert('Processo cadastrado com sucesso!');
    }

    setProcesso({ contribuinteId: '', numero: '', valor: '', situacao: '' });
    setMostrarFormulario(false);
    setIndiceEdicao(null);
  }

  function editarProcesso(index) {
    setProcesso(listaProcessos[index]);
    setIndiceEdicao(index);
    setMostrarFormulario(true);
  }

  function excluirProcesso(index) {
    if (window.confirm('Tem certeza que deseja excluir este processo?')) {
      const novaLista = listaProcessos.filter((_, i) => i !== index);
      setListaProcessos(novaLista);
    }
  }

  return (
    <div className="pagina-processo">
      <h1 className="titulo-processo">Cadastro de Processos</h1>

      <div className="botao-novo-processo">
        <Button
          label={mostrarFormulario ? 'Cancelar' : 'Novo Processo'}
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setProcesso({
              contribuinteId: '',
              numero: '',
              valor: '',
              situacao: '',
            });
            setIndiceEdicao(null);
          }}
        />
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} className="formulario-processo">
          <select
            className="campo-formulario"
            name="contribuinteId"
            value={processo.contribuinteId}
            onChange={handleAlterar}
            required
          >
            <option value="">Selecione o contribuinte</option>
            {contribuintes.map(({ id, nome }) => (
              <option key={id} value={id}>
                {nome}
              </option>
            ))}
          </select>

          <Input
            className="campo-formulario"
            name="numero"
            placeholder="Número do processo"
            value={processo.numero}
            onChange={handleAlterar}
            required
          />
          <Input
            className="campo-formulario"
            name="valor"
            type="number"
            placeholder="Valor (R$)"
            value={processo.valor}
            onChange={handleAlterar}
            required
          />

          <select
            className="campo-formulario"
            name="situacao"
            value={processo.situacao}
            onChange={handleAlterar}
            required
          >
            <option value="">Selecione a situação</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Suspenso">Suspenso</option>
          </select>

          <Button
            type="submit"
            label={indiceEdicao !== null ? 'Salvar Edição' : 'Salvar Processo'}
          />
        </form>
      )}

      <h2 className="subtitulo-processo">Lista de Processos</h2>
      <table className="tabela-processos">
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
          {listaProcessos.map((proc, i) => {
            const contribuinte = contribuintes.find(
              (c) => c.id.toString() === proc.contribuinteId
            );
            return (
              <tr key={i}>
                <td>{contribuinte?.nome || '-'}</td>
                <td>{proc.numero}</td>
                <td>R$ {parseFloat(proc.valor).toFixed(2)}</td>
                <td>{proc.situacao}</td>
                <td>
                  <Button label="Editar" onClick={() => editarProcesso(i)} />
                  <Button label="Excluir" onClick={() => excluirProcesso(i)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroProcesso;
