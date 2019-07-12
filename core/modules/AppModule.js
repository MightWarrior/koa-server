const Response = require('../Response');
const Joi = require('joi');
const schema = require('../validation.js');

const { Op } = require('sequelize');
const Idea = require('../../models/idea');
const Like = require('../../models/likes');
const User = require('../../models/users');
class AppModule {
  async ping(ctx) {
    return Response.text(ctx, 'pong');
  }

  async checkAuth(ctx) {
    return Response.text(ctx, 'nice');
  }

  async getIdeas(ctx) {
    const model = Idea.getModel(ctx.sequelize);
    const ideas = await model.findAll({
      attributes: ['title', 'description', 'user_id']
    });
    return Response.json(ctx, ideas);
  }

  async getIdeasByID(ctx) {
    const model = Idea.getModel(ctx.sequelize);
    const ideas = await model.findOne({
      where: {
        id: ctx.params.id
      }
    });
    return Response.json(ctx, ideas);
  }

  async postIdeas(ctx) {
    const { title, description, user_id } = ctx.request.body;
    const { error, value } = Joi.validate(
      { title: title, description: description, author: user_id },
      schema
    );
    ctx.assert(error === null, 400, error);
    const model = Idea.getModel(ctx.sequelize);
    const newIdea = await model.create(
      { title, description, user_id },
      { fields: ['title', 'description', 'user_id'] }
    );
    return Response.json(ctx, newIdea);
  }

  async deleteIdeas(ctx) {
    const model = Idea.getModel(ctx.sequelize);
    const deletedIdea = await model.destroy({
      where: {
        id: ctx.params.id
      }
    });
    return Response.json(ctx, deletedIdea);
  }

  async putIdeas(ctx) {
    ideas[ctx.params.id - 1] = ctx.request.body;
    return Response.json(ctx, ctx.request.body);
  }

  async getUsers(ctx) {
    const model = User.getModel(ctx.sequelize);
    const users = await model.findAll({
      attributes: ['username', 'islogged', 'registration_date']
    });
    return Response.json(ctx, users);
  }

  async postUser(ctx) {
    const {
      username,
      password,
      isLogged,
      registration_date
    } = ctx.request.body;
    const model = User.getModel(ctx.sequelize);
    const newUser = await model.create(
      { username, password, isLogged, registration_date },
      { fields: ['username', 'password', 'isLogged', 'registration_date'] }
    );
    return Response.json(ctx, newUser);
  }

  async logIn(ctx) {
    const { username, password } = ctx.request.body;

    const model = User.getModel(ctx.sequelize);
    const user = await model.findOne({
      attributes: ['id', 'username'],
      where: {
        username: {
          [Op.like]: username
        },
        password: {
          [Op.like]: password
        }
      }
    });

    ctx.assert(user !== null, 400, 'Something went wrong');

    ctx.session.user = user.id;
    return Response.json(ctx, user.id);
  }

  async privateIdeas(ctx) {
    const model = Idea.getModel(ctx.sequelize);
    const idea = await model.findAll({
      where: {
        user_id: {
          [Op.ne]: null
        },
        user_id: ctx.session.user
      }
    });
    ctx.body = idea;
  }

  async logout(ctx) {
    ctx.session.user = undefined;
    return Response.text(ctx, 'Success');
  }

  async authError(ctx) {
    return Response.text(ctx, 'You are not logged in');
  }
}

module.exports = new AppModule();
