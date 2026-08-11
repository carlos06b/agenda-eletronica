const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

function gerarToken(usuario) {
  return jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
}

async function cadastrar(req, res) {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ erro: 'Informe login e senha' });
    }

    if (senha.length < 4) {
      return res.status(400).json({ erro: 'A senha deve ter no minimo 4 caracteres' });
    }

    const jaExiste = await User.findOne({ where: { login } });

    if (jaExiste) {
      return res.status(400).json({ erro: 'Esse login ja esta em uso' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 8);

    const usuario = await User.create({ login, senha: senhaCriptografada });

    return res.status(201).json({
      usuario: { id: usuario.id, login: usuario.login },
      token: gerarToken(usuario)
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao cadastrar usuario' });
  }
}

async function login(req, res) {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ erro: 'Informe login e senha' });
    }

    const usuario = await User.findOne({ where: { login } });

    if (!usuario) {
      return res.status(401).json({ erro: 'Login ou senha incorretos' });
    }

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);

    if (!senhaConfere) {
      return res.status(401).json({ erro: 'Login ou senha incorretos' });
    }

    return res.json({
      usuario: { id: usuario.id, login: usuario.login },
      token: gerarToken(usuario)
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao fazer login' });
  }
}

module.exports = { cadastrar, login };