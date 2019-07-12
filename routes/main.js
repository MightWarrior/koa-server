const Router = require('koa2-router');

const AppModule = require('../core/modules/AppModule');

const router = new Router();

const checkAuth = (ctx, next) => {
  if (ctx.session.user !== undefined) {
    next();
  } else {
    return AppModule.authError(ctx);
  }
};

router.get('/ideas', ctx => {
  return AppModule.getIdeas(ctx);
});

router.get('/ideas/:id', ctx => {
  return AppModule.getIdeasByID(ctx);
});

router.post('/ideas', checkAuth, ctx => {
  return AppModule.postIdeas(ctx);
});

router.delete('/ideas/:id', checkAuth, ctx => {
  return AppModule.deleteIdeas(ctx);
});

router.get('/users', checkAuth, ctx => {
  return AppModule.getUsers(ctx);
});

router.post('/users', checkAuth, ctx => {
  return AppModule.postUser(ctx);
});

router.post('/login', ctx => {
  return AppModule.logIn(ctx);
});

router.get('/myideas', checkAuth, ctx => {
  return AppModule.privateIdeas(ctx);
});

router.get('/logout', checkAuth, ctx => {
  return AppModule.logout(ctx);
});

module.exports = router;
