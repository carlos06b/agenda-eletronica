const { Router } = require('express');

const userController = require('../controllers/userController');
const activityController = require('../controllers/activityController');
const auth = require('../middlewares/auth');

const routes = Router();

routes.post('/usuarios', userController.cadastrar);
routes.post('/login', userController.login);

routes.use(auth);

routes.get('/atividades', activityController.listar);
routes.get('/atividades/:id', activityController.buscarPorId);
routes.post('/atividades', activityController.criar);
routes.put('/atividades/:id', activityController.atualizar);
routes.patch('/atividades/:id/status', activityController.alterarStatus);
routes.delete('/atividades/:id', activityController.remover);

module.exports = routes;