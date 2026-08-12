import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  function handleSair() {
    sair();
    navigate('/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Agenda Eletronica
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">{usuario?.login}</Typography>
          <Button color="inherit" onClick={handleSair}>
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}