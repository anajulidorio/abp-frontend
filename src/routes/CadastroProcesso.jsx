import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../routes/Cadastros.css';
import { useProcesso } from '../contexts/ProcessoContext';
import { useCidadao } from '../contexts/CidadaoContext';

const CadastroProcesso = () => {
  const {
    processos,
    adicionarProcesso,
    editarProcessoContext,
    excluirProcessoContext,
  } = useProcesso();

  const { cidadaos } = useCidadao();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [indiceEdicao, setIndiceEdicao] = useState(null);
  const [arquivo, setArquivo] = useState(null);
  const [processo, setProcesso] = useState({
    contribuinteId: '',
    numero: '',
    valor: '',
    situacao: '',
  });

  function handleAlterar(e) {
    const { name, value } = e.target;
    setProcesso({ ...processo, [name]: name === 'contribuinteId' ? parseInt(value) : value });
  }

  function salvar(e) {
    e.preventDefault();

    if (
      processos.some(
        (p, i) => p.numero === processo.numero && i !== indiceEdicao
      )
    ) {
      alert('Número de processo já cadastrado.');
      return;
    }

    const novoProcesso = { ...processo, arquivo };

    if (indiceEdicao !== null) {
      editarProcessoContext(indiceEdicao, novoProcesso);
      alert('Processo editado com sucesso!');
    } else {
      adicionarProcesso(novoProcesso);
      alert('Processo cadastrado com sucesso!');
    }

    setProcesso({ contribuinteId: '', numero: '', valor: '', situacao: '' });
    setArquivo(null);
    setMostrarFormulario(false);
    setIndiceEdicao(null);
  }

  function editar(index) {
    setProcesso(processos[index]);
    setArquivo(processos[index].arquivo || null);
    setIndiceEdicao(index);
    setMostrarFormulario(true);
  }

  function excluir(index) {
    if (window.confirm('Tem certeza que deseja excluir este processo?')) {
      excluirProcessoContext(index);
    }
  }

  return (
    <div className="pagina-processo">
      <h1 className="titulo-processo">Cadastro de Processos</h1>

      <div className="botao-novo-processo">
        <Button label={mostrarFormulario ? 'Cancelar' : 'Novo Processo'} onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setProcesso({
              contribuinteId: '',
              numero: '',
              valor: '',
              situacao: '',
            });
            setArquivo(null);
            setIndiceEdicao(null);
          }}
        />
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} className="formulario-processo">
          <select className="campo-formulario" name="contribuinteId" value={processo.contribuinteId} onChange={handleAlterar} required>
            <option value="">Selecione o cidadão</option>
            {cidadaos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>

          <Input className="campo-formulario" name="numero" placeholder="Número do processo" value={processo.numero} onChange={handleAlterar} required/>
          <Input className="campo-formulario" name="valor" type="number"  placeholder="Valor (R$)" value={processo.valor} onChange={handleAlterar} required/>

          <select className="campo-formulario" name="situacao" value={processo.situacao} onChange={handleAlterar} required>
            <option value="">Selecione a situação</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Suspenso">Suspenso</option>
          </select>

          <input type="file" accept="application/pdf" className="campo-formulario" onChange={(e) => setArquivo(e.target.files[0])}/>

          <Button type="submit" label={indiceEdicao !== null ? 'Salvar Edição' : 'Salvar Processo'}/>
        </form>
      )}

      <h2 className="subtitulo-processo">Lista de Processos</h2>
      <table className="tabela-processos">
        <thead>
          <tr>
            <th>Cidadão</th>
            <th>Número</th>
            <th>Valor</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((proc, i) => {
            const cidadao = cidadaos.find(c => c.id === proc.contribuinteId);
            return (
              <tr key={i}>
                <td>{cidadao?.nome || '-'}</td>
                <td>{proc.numero}</td>
                <td>R$ {parseFloat(proc.valor).toFixed(2)}</td>
                <td>{proc.situacao}</td>
                <td>
                  <Button label="Editar" onClick={() => editar(i)} />
                  <Button label="Excluir" onClick={() => excluir(i)} />
                  <Button label="Ver PDF" onClick={() => {
                      if (proc.arquivo) {
                        const url = URL.createObjectURL(proc.arquivo);
                        window.open(url, '_blank');
                      } else {
                        alert('Nenhum arquivo disponível.');
                      }
                    }}
                  />
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
