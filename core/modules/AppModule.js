const Response = require('../Response');
const Joi = require('joi');
const schema = require('../validation.js');

class AppModule {
  async ping(ctx) {
    return Response.text(ctx, 'pong');
  }

  async checkAuth(ctx) {
    return Response.text(ctx, 'nice');
  }

  async getIdeas(ctx) {
    const result = await ctx.db.query(
      `select ideas.*, users.username as author from ideas, users where ideas.user_id = users.id`
    );
    ctx.body = result.rows;
  }

  async getIdeasByID(ctx) {
    const result = await ctx.db.query(
      `select * from ideas WHERE ideas.id = ${ctx.params.id}`
    );
    ctx.body = result.rows;
  }

  async postIdeas(ctx) {
    const { title, description, user_id } = ctx.request.body;
    const { error, value } = Joi.validate(
      { title: title, description: description, author: user_id },
      schema
    );
    ctx.assert(error === null, 400, error);
    const result = await ctx.db.query(
      `insert into ideas (title, description, user_id) values($1, $2, $3) RETURNING *`,
      [title, description, user_id]
    );
    return Response.json(ctx, result.rows[0]);
  }

  async deleteIdeas(ctx) {
    const result = await ctx.db.query(
      `delete from ideas where ideas.id = ${ctx.params.id} RETURNING *`
    );
    ctx.body = result.rows;
    return Response.json(ctx, result.rows[0]);
  }

  async putIdeas(ctx) {
    ideas[ctx.params.id - 1] = ctx.request.body;
    return Response.json(ctx, ctx.request.body);
  }

  async registerUser(ctx) {
    users.push(ctx.request.body);
    return Response.text(ctx, 'Succesfully registered');
  }
}

module.exports = new AppModule();
