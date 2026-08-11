const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const STATUS_VALIDOS = ['pendente', 'concluida', 'cancelada'];

const Activity = sequelize.define(
  'Activity',
  {
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dataFim: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...STATUS_VALIDOS),
      allowNull: false,
      defaultValue: 'pendente'
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'atividades'
  }
);

Activity.STATUS_VALIDOS = STATUS_VALIDOS;

module.exports = Activity;