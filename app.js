var express = require('express')
  , gm = require('gm')
  , app = express()

app.use(express.logger('dev'))

app.get('/', function (req, res) {
  res.send(
  [ '<!DOCTYPE html>'
  , '<html>'
  , '  <head>'
  , '  </head>'
  , '  <body>'
  , '  </body>'
  , '</html>'
  ].join('\n'))
})

app.get(/\/(\d+)x(\d+)/, function (req, res) {
  gm(req.params[0], req.params[1], req.query.color || '#ccc')
    .gravity('Center')
    .pointSize(30)
    .drawText(0, 0, req.params[0] + ' x ' + req.params[1])
    .stream('png', function (err, stdout, stderr) {
      if (err) return res.end(500)
      res.set(
        { 'Content-Type': 'image/png'
        , 'Cache-Control': 'max-age=315360000,public'
        })
      stdout.pipe(res)
      stderr.pipe(process.stdout)
    })
})

app.listen(9999)