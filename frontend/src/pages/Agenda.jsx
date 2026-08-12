import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';

import api from '../services/api';
import Navbar from '../components/Navbar';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import CalendarView from '../components/CalendarView';

const CARTOES_STATUS = [
  { chave: 'pendente', rotulo: 'Pendentes', icone: PendingRoundedIcon, cor: '#b7791f', fundo: '#fbf1e2' },
  { chave: 'concluida', rotulo: 'Concluidas', icone: CheckCircleRoundedIcon, cor: '#2e7d46', fundo: '#e7f4ea' },
  { chave: 'cancelada', rotulo: 'Canceladas', icone: CancelRoundedIcon, cor: '#7c877f', fundo: '#eef0ec' }
];

export default function Agenda() {
  const [atividades, setAtividades] = useState([]);
  const [aba, setAba] = useState(0);
  const [formAberto, setFormAberto] = useState(false);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();

  useEffect(() => {
    carregarAtividades();
  }, []);

  async function carregarAtividades() {
    try {
      const resposta = await api.get('/atividades');
      setAtividades(resposta.data);
    } catch (e) {
      enqueueSnackbar('Erro ao carregar as atividades', { variant: 'error' });
    }
  }

  function abrirNova() {
    setAtividadeSelecionada(null);
    setFormAberto(true);
  }

  function abrirEdicao(atividade) {
    setAtividadeSelecionada(atividade);
    setFormAberto(true);
  }

  async function salvarAtividade(dados) {
    if (atividadeSelecionada) {
      await api.put(`/atividades/${atividadeSelecionada.id}`, dados);
      enqueueSnackbar('Atividade atualizada', { variant: 'success' });
    } else {
      await api.post('/atividades', dados);
      enqueueSnackbar('Atividade criada', { variant: 'success' });
    }

    setFormAberto(false);
    carregarAtividades();
  }

  async function alterarStatus(atividade, status) {
    try {
      await api.patch(`/atividades/${atividade.id}/status`, { status });
      enqueueSnackbar('Status atualizado', { variant: 'success' });
      carregarAtividades();
    } catch (e) {
      enqueueSnackbar('Erro ao alterar o status', { variant: 'error' });
    }
  }

  async function excluirAtividade(atividade) {
    const { confirmed } = await confirm({
      title: 'Excluir atividade',
      description: `Tem certeza que deseja excluir "${atividade.nome}"? Essa acao nao pode ser desfeita.`,
      confirmationText: 'Excluir',
      confirmationButtonProps: { color: 'error' }
    });

    if (!confirmed) return;

    try {
      await api.delete(`/atividades/${atividade.id}`);
      enqueueSnackbar('Atividade excluida', { variant: 'success' });
      carregarAtividades();
    } catch (e) {
      enqueueSnackbar('Erro ao excluir a atividade', { variant: 'error' });
    }
  }

  const contagens = useMemo(() => {
    return atividades.reduce(
      (acc, atividade) => {
        acc[atividade.status] = (acc[atividade.status] || 0) + 1;
        return acc;
      },
      { pendente: 0, concluida: 0, cancelada: 0 }
    );
  }, [atividades]);

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3.5, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Minhas atividades</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {atividades.length === 0
                ? 'Nenhuma atividade cadastrada ainda'
                : `${atividades.length} atividade${atividades.length > 1 ? 's' : ''} no total`}
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={abrirNova}>
            Nova atividade
          </Button>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3.5 }}>
          {CARTOES_STATUS.map(({ chave, rotulo, icone: Icone, cor, fundo }) => (
            <Paper key={chave} sx={{ flex: 1, p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: fundo,
                  color: cor,
                  flexShrink: 0
                }}
              >
                <Icone sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
                  {contagens[chave]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rotulo}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>

        <Tabs
          value={aba}
          onChange={(e, valor) => setAba(valor)}
          slotProps={{ indicator: { sx: { display: 'none' } } }}
          sx={{
            mb: 3,
            minHeight: 40,
            backgroundColor: 'grey.100',
            borderRadius: '10px',
            p: 0.5,
            width: 'fit-content',
            '& .MuiTab-root': {
              minHeight: 34,
              borderRadius: '8px',
              px: 2.5,
              color: 'text.secondary'
            },
            '& .Mui-selected': {
              backgroundColor: 'background.paper',
              color: 'text.primary',
              boxShadow: '0 1px 2px rgba(28,35,33,0.08)'
            }
          }}
        >
          <Tab label="Calendario" disableRipple />
          <Tab label="Lista" disableRipple />
        </Tabs>

        {aba === 0 ? (
          <CalendarView atividades={atividades} onSelecionar={abrirEdicao} />
        ) : (
          <ActivityList
            atividades={atividades}
            onEditar={abrirEdicao}
            onExcluir={excluirAtividade}
            onAlterarStatus={alterarStatus}
            onNova={abrirNova}
          />
        )}
      </Container>

      <ActivityForm
        aberto={formAberto}
        atividade={atividadeSelecionada}
        onFechar={() => setFormAberto(false)}
        onSalvar={salvarAtividade}
      />
    </>
  );
}
