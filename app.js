const connect = require('connect')
const app = connect()
app.use(require('connect-logger')({
  format: '%date %status %method %url (%time)'
}));

const tilestrata = require('tilestrata')
const strata = tilestrata()

const disk = require('tilestrata-disk');
strata.layer('base')
  .route('tile.jpg')
    .use(disk.provider('map/{z}/tile_{y}_{x}.jpg'))

app.use(tilestrata.middleware({
  server: strata,
  prefix: '/tiles'
}))

var serveStatic = require('serve-static')
app.use(serveStatic('public'))

const http = require('http');
http.createServer(app).listen(3000)
