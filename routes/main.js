const Router = require('koa2-router');
const users = require('../users');

const AppModule = require('core/modules/AppModule');

const router = new Router();

const checkAuth = (ctx, next) => {
  for (let key in users) {
    if (
      users[key].username === ctx.request.body.username &&
      users[key].password === ctx.request.body.password
    ) {
      return next();
    }
  }
};

router.get('/ping', ctx => {
  return AppModule.ping(ctx);
});

router.get('/ideas', ctx => {
  return AppModule.getIdeas(ctx);
});

router.get('/ideas/:id', ctx => {
  return AppModule.getIdeasByID(ctx);
});

router.post('/ideas', ctx => {
  return AppModule.postIdeas(ctx);
});

router.delete('/ideas/:id', ctx => {
  return AppModule.deleteIdeas(ctx);
});

router.put('/ideas/:id', ctx => {
  return AppModule.putIdeas(ctx);
});

router.post('/users', checkAuth, ctx => {
  return AppModule.checkAuth(ctx);
});

router.post('./register', ctx => {
  return AppModule.registerUser(ctx);
});

module.exports = router;
