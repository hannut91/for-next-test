const express = require('express')
const next = require('next')
const redis = require('redis')
const session = require('express-session')
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient({
})

app.prepare().then(() => {
  const server = express()

  server.use(cookieParser())

  server.use(
    session({
      store: new RedisStore({
        client: redisClient,
        prefix: 'PHPREDIS_SESSION:',
      }),
      name: 'PHPSESSID',
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    })
  )

  server.all('*', (req, res) => {
    console.log('req.session: ', req.session);
    console.log('req.sessionID: ', req.sessionID);
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
