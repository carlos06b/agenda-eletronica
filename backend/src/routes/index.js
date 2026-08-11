const { Router } = require('express');

const userController = require('../controllers/userController');

const routes = Router();

routes.post('/usuarios', userController.cadastrar);
routes.post('/login', userController.login);

module.exports = routes;