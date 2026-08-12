import { useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { STATUS } from './statusInfo';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'pt-BR': ptBR }
});

const mensagens = {
  next: 'Proximo',
  previous: 'Anterior',
  today: 'Hoje',
  month: 'Mes',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Lista',
  date: 'Data',
  time: 'Hora',
  event: 'Atividade',
  noEventsInRange: 'Nenhuma atividade nesse periodo'
};

export default function CalendarView({ atividades, onSelecionar }) {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [visao, setVisao] = useState('month');

  const eventos = atividades.map((atividade) => ({
    title: atividade.nome,
    start: new Date(atividade.dataInicio),
    end: new Date(atividade.dataFim),
    atividade
  }));

  return (
    <Paper sx={{ p: { xs: 1.5, sm: 2.5 } }}>
      <Stack direction="row" spacing={2.5} sx={{ mb: 2, px: { xs: 0.5, sm: 0 } }}>
        {Object.keys(STATUS).map((chave) => (
          <Stack key={chave} direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: STATUS[chave].corHex
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {STATUS[chave].rotulo}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Calendar
        localizer={localizer}
        culture="pt-BR"
        events={eventos}
        messages={mensagens}
        startAccessor="start"
        endAccessor="end"
        date={dataAtual}
        onNavigate={setDataAtual}
        view={visao}
        onView={setVisao}
        onSelectEvent={(evento) => onSelecionar(evento.atividade)}
        eventPropGetter={(evento) => ({
          style: { backgroundColor: STATUS[evento.atividade.status].corHex }
        })}
      />
    </Paper>
  );
}