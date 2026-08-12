import {
  Chip,
  IconButton,
  MenuItem,
  Paper,
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { STATUS, formatarDataHora } from './statusInfo';

export default function ActivityList({ atividades, onEditar, onExcluir, onAlterarStatus }) {
  if (atividades.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Voce ainda nao tem atividades. Clique em "Nova atividade" para criar a primeira.
        </Typography>
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
            <TableRow key={atividade.id} hover>
              <TableCell>{atividade.nome}</TableCell>
              <TableCell sx={{ maxWidth: 260 }}>
                <Typography variant="body2" noWrap>
                  {atividade.descricao || '-'}
                </Typography>
              </TableCell>
              <TableCell>{formatarDataHora(atividade.dataInicio)}</TableCell>
              <TableCell>{formatarDataHora(atividade.dataFim)}</TableCell>
              <TableCell>
                <TextField
                  select
                  size="small"
                  variant="standard"
                  value={atividade.status}
                  onChange={(e) => onAlterarStatus(atividade, e.target.value)}
                  InputProps={{ disableUnderline: true }}
                  sx={{ minWidth: 130 }}
                  SelectProps={{
                    renderValue: (valor) => (
                      <Chip
                        size="small"
                        label={STATUS[valor].rotulo}
                        color={STATUS[valor].cor}
                      />
                    )
                  }}
                >
                  {Object.keys(STATUS).map((chave) => (
                    <MenuItem key={chave} value={chave}>
                      {STATUS[chave].rotulo}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Editar">
                  <IconButton onClick={() => onEditar(atividade)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton color="error" onClick={() => onExcluir(atividade)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}