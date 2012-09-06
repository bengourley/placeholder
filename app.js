// Deps
var express = require('express')
  , gm = require('gm')
  , markdown = require('github-flavored-markdown').parse
  , fs = require('fs')

// Create server
var app = express()

// Middleware
app.use(express.logger('dev'))
app.use(express.errorHandler())

// View settings
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

/*
 * Sanitizes a file-type extension
 */
function getFormat(f) {
  switch (f) {
    case '.jpg': return 'jpeg'
    case '.gif': return 'gif'
    default: return 'png'
  }
}

// Show the readme
app.get('/', function (req, res, next) {
  fs.readFile(__dirname + '/Readme.md', 'utf-8', function (err, data) {
    if (err) return next(err)
    res.render('index', { readme: markdown(data) })
  })
})

// Create an image
app.get(/\/(\d+)(?:x((\d+)))?(.\w+)?/, function (req, res, next) {

  var MAX_DIMENSION = 10000
    , width = req.params[0]
    , height = req.params[1] || width
    , colour = req.query.color || req.query.colour || 'ccc'
    , text = req.query.text || (width + ' x ' + height)
    , textColour = req.query.textColor || req.query.textColour || '000'
    , format = getFormat(req.params[2])

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    return next(new Error('Maximum dimension exceeded (' + MAX_DIMENSION +')'))
  }

  gm(width, height, '#' + colour)
    // Center the text
    .gravity('Center')
    // Background colour
    .fill('#' + textColour)
    // Scale font-size according to image dimensions
    .pointSize(30 * (parseInt(Math.min(width, height), 10) / 200))
    // Draw the text
    .drawText(0, 0, text)
    // Get a readable stream of the image data
    .stream(format, function (err, stdout, stderr) {
      // Pass err to the error handling middleware
      if (err) return next(err)
      // Set cache headers
      res.set(
        { 'Content-Type': 'image/' + format
        , 'Cache-Control': 'max-age=315360000,public'
        , 'Date': new Date().toUTCString()
        , 'Last-Modified': new Date().toUTCString()
        })
      // Pipe image data stream to the response
      stdout.pipe(res)
      // Pipe any stdout data to the process.stdout
      // so that it can be retrieved in the logs
      stderr.pipe(process.stdout)
    })
})

// Start the server on the given port, or default to 9999
var server = app.listen(process.env.PORT || 9999, function () {

  // Output some useful info

  var address = 'http://' + server.address().address + ':' + server.address().port

  console.log(
    [ ''
    , '  Placeholder image server running at: ' + address
    , ''
    , '  Some example links to try:'
    , '  -  ' + address + '/500x300'
    , '  -  ' + address + '/500x300.jpg?text=Image!'
    , '  -  ' + address + '/500x300.jpg?color=c00&textColor=fff'
    , ''
    , '  For more examples and usage, see the readme: ' + address
    , ''
    ].join('\n'))

})