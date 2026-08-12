import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { STATUS, formatarDataHora } from './statusInfo';
import StatusPill from './StatusPill';

export default function ActivityList({ atividades, onEditar, onExcluir, onAlterarStatus, onNova }) {
  if (atividades.length === 0) {
    return (
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            mx: 'auto',
            mb: 2,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            color: 'text.secondary'
          }}
        >
          <EventNoteRoundedIcon />
        </Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Nenhuma atividade por aqui</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Crie a primeira atividade para comecar a organizar sua agenda.
        </Typography>
        {onNova && (
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={onNova}>
            Nova atividade
          </Button>
        )}
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descricao</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell>Termino</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Acoes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {atividades.map((atividade) => (
            <TableRow
              key={atividade.id}
              hover
              sx={{
                '&:last-of-type td': { borderBottom: 0 },
                '& .linha-acoes': { opacity: 0, transition: 'opacity 0.12s ease' },
                '&:hover .linha-acoes': { opacity: 1 }
              }}
            >
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {atividade.nome}
                </Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: 240 }}>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {atividade.descricao || '-'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatarDataHora(atividade.dataInicio)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatarDataHora(atividade.dataFim)}
                </Typography>
              </TableCell>
              <TableCell>
                <TextField
                  select
                  size="small"
                  variant="standard"
                  value={atividade.status}
                  onChange={(e) => onAlterarStatus(atividade, e.target.value)}
                  sx={{ minWidth: 128, '& .MuiSelect-select': { p: 0, display: 'flex' } }}
                  slotProps={{
                    input: { disableUnderline: true },
                    select: { renderValue: (valor) => <StatusPill status={valor} /> }
                  }}
                >
                  {Object.keys(STATUS).map((chave) => (
                    <MenuItem key={chave} value={chave}>
                      <StatusPill status={chave} />
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} className="linha-acoes" sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Editar">
                    <IconButton size="small" onClick={() => onEditar(atividade)}>
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton size="small" color="error" onClick={() => onExcluir(atividade)}>
                      <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
