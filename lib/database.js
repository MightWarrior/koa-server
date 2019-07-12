const Sequelize = require('sequelize');

const sequelize = new Sequelize('ideas', 'max', '', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
