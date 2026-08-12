import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';

import { STATUS, paraInputDateTime } from './statusInfo';
import StatusPill from './StatusPill';

const FORM_VAZIO = {
  nome: '',
  descricao: '',
  dataInicio: '',
  dataFim: '',
  status: 'pendente'
};

export default function ActivityForm({ aberto, atividade, onFechar, onSalvar }) {
  const [form, setForm] = useState(FORM_VAZIO);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (atividade) {
      setForm({
        nome: atividade.nome,
        descricao: atividade.descricao || '',
        dataInicio: paraInputDateTime(atividade.dataInicio),
        dataFim: paraInputDateTime(atividade.dataFim),
        status: atividade.status
      });
    } else {
      setForm(FORM_VAZIO);
    }

    setErro('');
  }, [atividade, aberto]);

  function handleChange(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  async function handleSalvar() {
    setErro('');

    if (!form.nome.trim()) {
      setErro('Informe o nome da atividade');
      return;
    }

    if (!form.dataInicio || !form.dataFim) {
      setErro('Informe as datas de inicio e termino');
      return;
    }

    if (new Date(form.dataFim) <= new Date(form.dataInicio)) {
      setErro('A data de termino deve ser maior que a de inicio');
      return;
    }

    setSalvando(true);

    try {
      await onSalvar({
        ...form,
        dataInicio: new Date(form.dataInicio).toISOString(),
        dataFim: new Date(form.dataFim).toISOString()
      });
    } catch (e) {
      setErro(e.response?.data?.erro || 'Nao foi possivel salvar');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={aberto} onClose={onFechar} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 3 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            flexShrink: 0
          }}
        >
          <EventNoteRoundedIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography component="span" variant="h6">
          {atividade ? 'Editar atividade' : 'Nova atividade'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

        <Stack spacing={2.25} sx={{ mt: 0.5 }}>
          <TextField
            label="Nome"
            fullWidth
            value={form.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
          />
          <TextField
            label="Descricao"
            fullWidth
            multiline
            rows={3}
            value={form.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Inicio"
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={form.dataInicio}
              onChange={(e) => handleChange('dataInicio', e.target.value)}
            />
            <TextField
              label="Termino"
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={form.dataFim}
              onChange={(e) => handleChange('dataFim', e.target.value)}
            />
          </Stack>
          <TextField
            label="Status"
            select
            fullWidth
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            slotProps={{ select: { renderValue: (valor) => <StatusPill status={valor} /> } }}
          >
            {Object.keys(STATUS).map((chave) => (
              <MenuItem key={chave} value={chave}>
                <StatusPill status={chave} />
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={onFechar} color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSalvar} disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}