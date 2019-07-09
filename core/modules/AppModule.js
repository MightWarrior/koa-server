const Response = require('core/Response');
const ideas = require('../../ideas');
const users = require('../../users');

class AppModule {
  async ping(ctx) {
    return Response.text(ctx, 'pong');
  }

  async checkAuth(ctx) {
    return Response.text(ctx, 'nice');
  }

  async getIdeas(ctx) {
    return Response.json(ctx, ideas);
  }

  async getIdeasByID(ctx) {
    return Response.json(ctx, ideas[ctx.params.id - 1]);
  }

  async postIdeas(ctx) {
    ideas.push(ctx.request.body);
    return Response.json(ctx, ctx.request.body);
  }

  async deleteIdeas(ctx) {
    ideas.splice(ctx.params.id - 1, 1);
    return Response.text(ctx, 'Successfully deleted');
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
