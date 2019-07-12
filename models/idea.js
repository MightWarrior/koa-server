const Sequelize = require('sequelize');
const { Model } = Sequelize;
const User = require('./users');

class Idea extends Model {}

module.exports = {
  getModel: sequelize => {
    Idea.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        user_id: Sequelize.INTEGER
      },
      { sequelize, tableName: 'ideas', timestamps: false }
    );

    // Idea.belongsTo(User);

    return Idea;
  }
};
