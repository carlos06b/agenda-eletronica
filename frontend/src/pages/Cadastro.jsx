import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Link, TextField, Typography } from '@mui/material';

import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Cadastro() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro('');

    if (senha !== confirmacao) {
      setErro('As senhas nao sao iguais');
      return;
    }

    setCarregando(true);

    try {
      await cadastrar(login, senha);
      navigate('/agenda', { replace: true });
    } catch (e) {
      setErro(e.response?.data?.erro || 'Nao foi possivel cadastrar');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Crie sua conta"
      subtitulo="Preencha os dados"
      rodape={
        <>
          Ja tem conta?{' '}
          <Link component={RouterLink} to="/login" underline="hover" sx={{ fontWeight: 600 }}>
            Entrar
          </Link>
        </>
      }
    >
      {erro && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {erro}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          Login
        </Typography>
        <TextField
          fullWidth
          placeholder="Escolha um usuario"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          Senha
        </Typography>
        <TextField
          type="password"
          fullWidth
          placeholder="********"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          Confirmar senha
        </Typography>
        <TextField
          type="password"
          fullWidth
          placeholder="********"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3.5 }}
          disabled={carregando}
        >
          {carregando ? 'Cadastrando...' : 'Criar conta'}
        </Button>
      </Box>
    </AuthLayout>
  );
}
