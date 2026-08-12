import { AppBar, Avatar, Box, Container, Toolbar, Tooltip, Typography } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  function handleSair() {
    sair();
    navigate('/login', { replace: true });
  }

  const iniciais = (usuario?.login || '?').slice(0, 2).toUpperCase();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexGrow: 1 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}
            >
              <EventAvailableRoundedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Agenda
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  bgcolor: 'secondary.main'
                }}
              >
                {iniciais}
              </Avatar>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}
              >
                {usuario?.login}
              </Typography>
            </Box>

            <Tooltip title="Sair">
              <Box
                onClick={handleSair}
                role="button"
                tabIndex={0}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                  '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' }
                }}
              >
                <LogoutRoundedIcon sx={{ fontSize: 20 }} />
              </Box>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
