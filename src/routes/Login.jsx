import React, { useState } from 'react';
import '../routes/Login.css';

function Login({ aoAvancar }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login === 'admin' && senha === '1234') {
      aoAvancar({ login, senha });
    } else {
      alert('Login ou senha incorretos!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Justitia.svg/1200px-Justitia.svg.png"
            alt="Logo"
            className="logo"
          />
          <h1>Fazer login</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Login:</label>
          <input
            type="text"
            placeholder="Digite seu login..."
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="input-text"
          />

          <label>Senha:</label>
          <div className="senha-container">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Digite sua senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <span
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="olhinho"
              title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? '👁️' : '👁️'}
            </span>
          </div>
          <button type="submit">AVANÇAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
