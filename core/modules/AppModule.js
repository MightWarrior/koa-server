const Response = require('../Response');
const Joi = require('joi');
const schema = require('../validation.js');

const { Op } = require('sequelize');
const Idea = require('../../models/idea');
const User = require('../../models/users');

class AppModule {
  async ping(ctx) {
    return Response.text(ctx, 'pong');
  }

  async checkAuth(ctx) {
    return Response.text(ctx, 'nice');
  }

  async getIdeas(ctx) {
    const ideas = await Idea.findAll({
      attributes: ['id', 'title', 'description', 'userId']
    });
    return Response.json(ctx, ideas);
  }

  async getIdeasByID(ctx) {
    const ideas = await Idea.findOne({
      where: {
        id: ctx.params.id
      }
    });
    return Response.json(ctx, ideas);
  }

  async postIdeas(ctx) {
    const { title, description, userId } = ctx.request.body;
    const { error, value } = Joi.validate(
      { title: title, description: description, author: userId },
      schema
    );
    ctx.assert(error === null, 400, error);
    const newIdea = await Idea.create(
      { title, description, userId },
      { fields: ['title', 'description', 'userId'] }
    );
    return Response.json(ctx, newIdea);
  }

  async deleteIdeas(ctx) {
    const deletedIdea = await Idea.destroy({
      where: {
        id: ctx.params.id
      }
    });
    return Response.json(ctx, deletedIdea);
  }

  async getUsers(ctx) {
    const users = await User.findAll({
      attributes: ['id', 'username', 'islogged', 'registration_date']
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
    const newUser = await User.create(
      { username, password, isLogged, registration_date },
      { fields: ['username', 'password', 'isLogged', 'registration_date'] }
    );
    return Response.json(ctx, newUser);
  }

  async logIn(ctx) {
    const { username, password } = ctx.request.body;

    const user = await User.findOne({
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
    const idea = await Idea.findAll({
      where: {
        userId: ctx.session.user
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
