const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Like extends Model {}

module.exports = {
  getModel: sequelize => {
    Like.init(
      {
        idea_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER
      },
      { sequelize, tableName: 'likes', timestamps: false }
    );

    return Like;
  }
};
