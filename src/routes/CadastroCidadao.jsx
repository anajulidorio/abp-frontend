import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../routes/Cadastros.css';

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

  function handleAlterar(e) {
    const { name, value } = e.target;
    setCidadao({ ...cidadao, [name]: value });
  }

  function salvar(e) {
    e.preventDefault();
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
    <div className="pagina-cadastro">
      <h1 className="titulo-cadastro">Cadastro de Cidadãos</h1>

      <div className="botao-novo-cidadao">
        <Button
          label={mostrarFormulario ? 'Cancelar' : 'Novo Cidadão'}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        />
      </div>

      {mostrarFormulario && (
        <form onSubmit={salvar} className="formulario-cidadao">
          <Input name="nome" placeholder="Nome completo" value={cidadao.nome} onChange={handleAlterar} required/>
          <Input name="cpf" placeholder="CPF" value={cidadao.cpf} onChange={handleAlterar} required/>
          <Input name="dataNascimento" type="date" value={cidadao.dataNascimento} onChange={handleAlterar} required/>
          <Input name="email" type="email" placeholder="Email" value={cidadao.email} onChange={handleAlterar} required/>
          <Input name="telefone" placeholder="Telefone" value={cidadao.telefone} onChange={handleAlterar}/>
          <Input name="ocupacao" placeholder="Ocupação" value={cidadao.ocupacao} onChange={handleAlterar} required/>
          <Input name="logradouro" placeholder="Logradouro" value={cidadao.logradouro} onChange={handleAlterar} required/>
          <Input name="numero" placeholder="Número" value={cidadao.numero} onChange={handleAlterar} required/>
          <Input name="complemento" placeholder="Complemento" value={cidadao.complemento} onChange={handleAlterar}/>
          <Input name="bairro" placeholder="Bairro" value={cidadao.bairro} onChange={handleAlterar} required/>
          <Input name="cidade" placeholder="Cidade" value={cidadao.cidade} onChange={handleAlterar} required/>
          <Input name="estado" placeholder="Estado" value={cidadao.estado} onChange={handleAlterar} required/>
          <Button type="submit" label="Salvar Cidadão" />
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroCidadao;
