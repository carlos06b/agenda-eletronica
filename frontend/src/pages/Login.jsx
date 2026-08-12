import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Link, TextField, Typography } from '@mui/material';

import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { entrar } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await entrar(login, senha);
      navigate('/agenda', { replace: true });
    } catch (e) {
      setErro(e.response?.data?.erro || 'Nao foi possivel entrar');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Bem-vindo"
      subtitulo="Entre para ver suas atividades"
      rodape={
        <>
          Nao tem conta?{' '}
          <Link component={RouterLink} to="/cadastro" underline="hover" sx={{ fontWeight: 600 }}>
            Cadastre-se
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
          placeholder="Seu usuario"
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
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3.5 }}
          disabled={carregando}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </Button>
      </Box>
    </AuthLayout>
  );
}
