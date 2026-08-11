const sequelize = require('../config/database');
const User = require('./User');
const Activity = require('./Activity');

User.hasMany(Activity, { foreignKey: 'usuarioId', as: 'atividades' });
Activity.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = { sequelize, User, Activity };