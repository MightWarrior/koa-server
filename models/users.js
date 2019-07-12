const Sequelize = require('sequelize');
const { Model } = Sequelize;

class User extends Model {}

module.exports = {
  getModel: sequelize => {
    User.init(
      {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        islogged: Sequelize.BOOLEAN,
        registration_date: Sequelize.DATE
      },
      { sequelize, tableName: 'users', timestamps: false }
    );

    return User;
  }
};
