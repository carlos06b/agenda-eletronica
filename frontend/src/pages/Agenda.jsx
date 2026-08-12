import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import api from '../services/api';
import Navbar from '../components/Navbar';
import ActivityList from '../components/ActivityList';

export default function Agenda() {
  const [atividades, setAtividades] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarAtividades();
  }, []);

  async function carregarAtividades() {
    try {
      const resposta = await api.get('/atividades');
      setAtividades(resposta.data);
    } catch (e) {
      setErro('Erro ao carregar as atividades');
    }
  }

  async function alterarStatus(atividade, status) {
    try {
      await api.patch(`/atividades/${atividade.id}/status`, { status });
      setMensagem('Status atualizado');
      carregarAtividades();
    } catch (e) {
      setErro('Erro ao alterar o status');
    }
  }

  async function excluirAtividade(atividade) {
    const confirmou = window.confirm(`Excluir a atividade "${atividade.nome}"?`);

    if (!confirmou) return;

    try {
      await api.delete(`/atividades/${atividade.id}`);
      setMensagem('Atividade excluida');
      carregarAtividades();
    } catch (e) {
      setErro('Erro ao excluir a atividade');
    }
  }

  function abrirEdicao(atividade) {
    console.log('editar', atividade);
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h5">Minhas atividades</Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Nova atividade
          </Button>
        </Box>

        <ActivityList
          atividades={atividades}
          onEditar={abrirEdicao}
          onExcluir={excluirAtividade}
          onAlterarStatus={alterarStatus}
        />
      </Container>

      <Snackbar
        open={!!mensagem}
        autoHideDuration={3000}
        onClose={() => setMensagem('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setMensagem('')}>
          {mensagem}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!erro}
        autoHideDuration={4000}
        onClose={() => setErro('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setErro('')}>
          {erro}
        </Alert>
      </Snackbar>
    </>
  );
}