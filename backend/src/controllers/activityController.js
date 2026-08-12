const { Activity } = require('../models');

function validarAtividade({ nome, dataInicio, dataFim, status }) {
  if (!nome || !nome.trim()) {
    return 'O nome da atividade e obrigatorio';
  }

  if (!dataInicio || !dataFim) {
    return 'Informe a data de inicio e a data de termino';
  }

  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);

  if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
    return 'Data invalida';
  }

  if (fim <= inicio) {
    return 'A data de termino deve ser maior que a data de inicio';
  }

  if (status && !Activity.STATUS_VALIDOS.includes(status)) {
    return 'Status invalido';
  }

  return null;
}

async function listar(req, res) {
  try {
    const atividades = await Activity.findAll({
      where: { usuarioId: req.usuarioId },
      order: [['dataInicio', 'ASC']]
    });

    return res.json(atividades);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar atividades' });
  }
}

async function buscarPorId(req, res) {
  try {
    const atividade = await Activity.findOne({
      where: { id: req.params.id, usuarioId: req.usuarioId }
    });

    if (!atividade) {
      return res.status(404).json({ erro: 'Atividade nao encontrada' });
    }

    return res.json(atividade);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar atividade' });
  }
}

async function criar(req, res) {
  try {
    const { nome, descricao, dataInicio, dataFim, status } = req.body;

    const mensagemErro = validarAtividade({ nome, dataInicio, dataFim, status });

    if (mensagemErro) {
      return res.status(400).json({ erro: mensagemErro });
    }

    const atividade = await Activity.create({
      nome: nome.trim(),
      descricao,
      dataInicio,
      dataFim,
      status: status || 'pendente',
      usuarioId: req.usuarioId
    });

    return res.status(201).json(atividade);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar atividade' });
  }
}

async function atualizar(req, res) {
  try {
    const atividade = await Activity.findOne({
      where: { id: req.params.id, usuarioId: req.usuarioId }
    });

    if (!atividade) {
      return res.status(404).json({ erro: 'Atividade nao encontrada' });
    }

    const { nome, descricao, dataInicio, dataFim, status } = req.body;

    const mensagemErro = validarAtividade({ nome, dataInicio, dataFim, status });

    if (mensagemErro) {
      return res.status(400).json({ erro: mensagemErro });
    }

    await atividade.update({
      nome: nome.trim(),
      descricao,
      dataInicio,
      dataFim,
      status: status || atividade.status
    });

    return res.json(atividade);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao atualizar atividade' });
  }
}

async function alterarStatus(req, res) {
  try {
    const { status } = req.body;

    if (!Activity.STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: 'Status invalido' });
    }

    const atividade = await Activity.findOne({
      where: { id: req.params.id, usuarioId: req.usuarioId }
    });

    if (!atividade) {
      return res.status(404).json({ erro: 'Atividade nao encontrada' });
    }

    await atividade.update({ status });

    return res.json(atividade);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao alterar o status' });
  }
}

async function remover(req, res) {
  try {
    const atividade = await Activity.findOne({
      where: { id: req.params.id, usuarioId: req.usuarioId }
    });

    if (!atividade) {
      return res.status(404).json({ erro: 'Atividade nao encontrada' });
    }

    await atividade.destroy();

    return res.status(204).send();
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao excluir atividade' });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, alterarStatus, remover };