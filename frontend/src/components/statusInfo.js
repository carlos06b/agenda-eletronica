export const STATUS = {
  pendente: { rotulo: 'Pendente', cor: 'warning', corHex: '#ed6c02' },
  concluida: { rotulo: 'Concluida', cor: 'success', corHex: '#2e7d32' },
  cancelada: { rotulo: 'Cancelada', cor: 'default', corHex: '#9e9e9e' }
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