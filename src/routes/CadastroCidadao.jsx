import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../routes/Cadastros.css';
import { useCidadao } from '../contexts/CidadaoContext';

const CadastroCidadao = () => {
  const {
    cidadaos,
    adicionarCidadao,
    editarCidadaoContext,
    excluirCidadaoContext,
  } = useCidadao();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cidadaoEmEdicao, setCidadaoEmEdicao] = useState(null);

  const CidadaoInicial = {
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
  };

  const [cidadao, setCidadao] = useState(CidadaoInicial);

  function handleAlterar(e) {
    const { name, value } = e.target;
    setCidadao({ ...cidadao, [name]: value });
  }

  function salvar(e) {
    e.preventDefault();

    const cpfExiste = cidadaos.some(
      (c) => c.cpf === cidadao.cpf && c.id !== cidadaoEmEdicao?.id
    );

    if (cpfExiste) {
      window.alert('CPF já cadastrado.');
      return;
    }

    if (cidadaoEmEdicao) {
      editarCidadaoContext(cidadaoEmEdicao.id, { ...cidadao, id: cidadaoEmEdicao.id });
      window.alert('Cidadão editado com sucesso!');
    } else {
      adicionarCidadao(cidadao);
      window.alert('Cidadão cadastrado com sucesso!');
    }

    setCidadao(CidadaoInicial);
    setMostrarFormulario(false);
    setCidadaoEmEdicao(null);
  }

  function editar(id) {
    const cidadaoParaEditar = cidadaos.find(c => c.id === id);
    if (cidadaoParaEditar) {
      setCidadao(cidadaoParaEditar);
      setCidadaoEmEdicao(cidadaoParaEditar);
      setMostrarFormulario(true);
    }
  }

  function excluir(id) {
    if (window.confirm('Tem certeza que deseja excluir este cidadão?')) {
      excluirCidadaoContext(id);
      window.alert('Cidadão excluído com sucesso!');
    }
  }

  return (
    <div className="pagina-cadastro">
      <h1 className="titulo-cadastro">Cadastro de Cidadãos</h1>

      <div className="botao-novo-cidadao">
        <Button label={mostrarFormulario ? 'Cancelar' : 'Novo Cidadão'} onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setCidadao(CidadaoInicial);
            setCidadaoEmEdicao(null);
          }}
        />
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} className="formulario-cidadao">
          <Input name="nome" placeholder="Nome completo" value={cidadao.nome} onChange={handleAlterar} required />
          <Input name="cpf" placeholder="CPF" value={cidadao.cpf} onChange={handleAlterar} required />
          <Input name="dataNascimento" type="date" value={cidadao.dataNascimento} onChange={handleAlterar} required />
          <Input name="email" type="email" placeholder="Email" value={cidadao.email} onChange={handleAlterar} required />
          <Input name="telefone" placeholder="Telefone" value={cidadao.telefone} onChange={handleAlterar} />
          <Input name="ocupacao" placeholder="Ocupação" value={cidadao.ocupacao} onChange={handleAlterar} required />
          <Input name="logradouro" placeholder="Logradouro" value={cidadao.logradouro} onChange={handleAlterar} required />
          <Input name="numero" placeholder="Número" value={cidadao.numero} onChange={handleAlterar} required />
          <Input name="complemento" placeholder="Complemento" value={cidadao.complemento} onChange={handleAlterar} />
          <Input name="bairro" placeholder="Bairro" value={cidadao.bairro} onChange={handleAlterar} required />
          <Input name="cidade" placeholder="Cidade" value={cidadao.cidade} onChange={handleAlterar} required />
          <select name="estado" value={cidadao.estado} onChange={handleAlterar} required className="campo-formulario">
            <option value="">Selecione o Estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
          <Button type="submit" label={cidadaoEmEdicao ? 'Salvar Edição' : 'Salvar Cidadão'} />
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
          {cidadaos.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.cpf}</td>
              <td>{c.dataNascimento}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
              <td>{c.ocupacao}</td>
              <td>
                {`${c.logradouro}, ${c.numero}${c.complemento ? ', ' + c.complemento : ''} - ${c.bairro}, ${c.cidade} - ${c.estado}`}
              </td>
              <td>
                 <Button
                  label="✏️"
                  onClick={() => editar(c.id)}
                  className="botao-icone"
                />
                <Button
                  label="❌"
                  onClick={() => excluir(c.id)}
                  className="botao-icone"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroCidadao;
