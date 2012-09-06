var express = require('express')
  , gm = require('gm')
  , markdown = require('github-flavored-markdown').parse
  , fs = require('fs')
  , app = express()

app.use(express.logger('dev'))
app.use(express.errorHandler())
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

app.get('/', function (req, res, next) {
  fs.readFile(__dirname + '/Readme.md', 'utf-8', function (err, data) {
    if (err) return next(err)
    res.render('index', { readme: markdown(data) })
  })
})

function getFormat(f) {
  switch (f) {
    case '.jpg': return 'jpeg'
    case '.gif': return 'gif'
    default: return 'png'
  }
}

app.get(/\/(\d+)x(\d+)(.\w+)?/, function (req, res, next) {

  var width = req.params[0]
    , height = req.params[1]
    , colour = req.query.color || req.query.colour || 'ccc'
    , text = req.query.text || (width + ' x ' + height)
    , textColour = req.query.textColor || req.query.textColour || '000'
    , format = getFormat(req.params[2])

  gm(width, height, '#' + colour)
    .gravity('Center')
    .fill('#' + textColour)
    .pointSize(30 * (parseInt(Math.min(width, height), 10) / 200))
    .drawText(0, 0, text)
    .stream('png', function (err, stdout, stderr) {
      if (err) return next(err)
      res.set(
        { 'Content-Type': 'image/' + format
        , 'Cache-Control': 'max-age=315360000,public'
        , 'Date': new Date().toUTCString()
        , 'Last-Modified': new Date().toUTCString()
        })
      stdout.pipe(res)
      stderr.pipe(process.stdout)
    })
})

app.listen(9999)