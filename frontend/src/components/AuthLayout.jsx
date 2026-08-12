import { Box, Typography } from '@mui/material';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';

export default function AuthLayout({ titulo, subtitulo, children, rodape }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 6,
        backgroundColor: 'background.default'
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 340 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 4, justifyContent: 'center' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText'
            }}
          >
            <EventAvailableRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Agenda
          </Typography>
        </Box>

        <Typography variant="h5" align="center" sx={{ mb: 0.75 }}>
          {titulo}
        </Typography>
        {subtitulo && (
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            {subtitulo}
          </Typography>
        )}

        {children}

        {rodape && (
          <Typography variant="body2" align="center" sx={{ mt: 3.5, color: 'text.secondary' }}>
            {rodape}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
