const router = require('koa-router')()

router.prefix('/users')

router.get('/account', (ctx, next) => {
  const info = ctx.request.body;
})

module.exports = router