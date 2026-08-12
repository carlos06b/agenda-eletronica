import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario');
    return salvo ? JSON.parse(salvo) : null;
  });

  function salvarSessao(dados) {
    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));
    setUsuario(dados.usuario);
  }

  async function entrar(login, senha) {
    const resposta = await api.post('/login', { login, senha });
    salvarSessao(resposta.data);
  }

  async function cadastrar(login, senha) {
    const resposta = await api.post('/usuarios', { login, senha });
    salvarSessao(resposta.data);
  }

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, cadastrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}