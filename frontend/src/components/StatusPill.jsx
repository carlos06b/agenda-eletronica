import { Box, Typography } from '@mui/material';

import { STATUS } from './statusInfo';

export default function StatusPill({ status }) {
  const info = STATUS[status];

  if (!info) return null;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        borderRadius: '999px',
        backgroundColor: info.corFundo
      }}
    >
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: info.corTexto }} />
      <Typography variant="caption" sx={{ fontWeight: 700, color: info.corTexto, lineHeight: 1 }}>
        {info.rotulo}
      </Typography>
    </Box>
  );
}
