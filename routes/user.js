const router = require("koa-router")();

const User = require("./../controller/user");

router.prefix("/user");

router.post("/account", async (ctx, next) => {
  const result = await User.Account(ctx.request.body || ctx.session);
  if (result.status === 200) {
    ctx.session.username = result.data.username;
    ctx.session.password = result.data.password;
  }
  ctx.body = result;
});

router.post("/info", async (ctx, next) => {
  const result = await User.Info(ctx.request.body);
  ctx.body = result;
});

module.exports = router;
