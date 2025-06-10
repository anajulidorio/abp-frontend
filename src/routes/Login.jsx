import React, { useState } from 'react';
import '../routes/Login.css';

function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login: ${login}\nSenha: ${senha}`);
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
          />
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">AVANÇAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
