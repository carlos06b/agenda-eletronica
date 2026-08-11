const { Router } = require('express');

const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const routes = Router();

routes.post('/usuarios', userController.cadastrar);
routes.post('/login', userController.login);

routes.use(auth);

routes.get('/teste', (req, res) => {
  return res.json({ mensagem: 'Token valido', usuarioId: req.usuarioId });
});

module.exports = routes;