const Sequelize = require('sequelize');
const sequelize = require('lib/database');
const Users = require('models/Users');

const Ideas = sequelize.define(
  'ideas',
  {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    tableName: 'ideas',
    timestamps: false
  }
);
Ideas.belongsTo(Users);

module.exports = Ideas;
