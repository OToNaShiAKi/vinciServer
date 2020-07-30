const AllowCrossOrigin = async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://hustmaths.top');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Access-Control-Allow-Methods', ' POST, GET');
  ctx.set('Access-Control-Allow-Credentials', true);
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
}
module.exports = AllowCrossOrigin