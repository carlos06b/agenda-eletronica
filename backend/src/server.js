require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3333;

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Banco de dados conectado');

    app.listen(PORT, () => {
      console.log('Servidor rodando em http://localhost:' + PORT);
    });
  } catch (erro) {
    console.error('Nao foi possivel conectar no banco:', erro.message);
  }
}

iniciarServidor();