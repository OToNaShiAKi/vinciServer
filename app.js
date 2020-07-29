const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const user = require('./routes/user')

require('./db/mongo')

const session = require('koa-generic-session')
const redisStroe = require('koa-redis')
const redisConfig = require('./config/db').Redis

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session
app.keys = ['hustmaths'];
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  },
  store: redisStroe({
    all: redisConfig
  })
}))

// routes
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app