export const STATUS = {
  pendente: {
    rotulo: 'Pendente',
    cor: 'warning',
    corHex: '#b7791f',
    corTexto: '#8a5a12',
    corFundo: '#fbf1e2'
  },
  concluida: {
    rotulo: 'Concluida',
    cor: 'success',
    corHex: '#2e7d46',
    corTexto: '#1f6136',
    corFundo: '#e7f4ea'
  },
  cancelada: {
    rotulo: 'Cancelada',
    cor: 'default',
    corHex: '#7c877f',
    corTexto: '#5f6b67',
    corFundo: '#eef0ec'
  }
};

export function paraInputDateTime(valor) {
  if (!valor) return '';

  const data = new Date(valor);
  const minutosDeFuso = data.getTimezoneOffset();

  return new Date(data.getTime() - minutosDeFuso * 60000).toISOString().slice(0, 16);
}

export function formatarDataHora(valor) {
  return new Date(valor).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}