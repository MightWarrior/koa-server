const Sequelize = require('sequelize');
const sequelize = require('lib/database');

const Users = sequelize.define(
  'users',
  {
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isLogged: {
      type: Sequelize.BOOLEAN
    },
    registration_date: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false
  }
);
module.exports = Users;
