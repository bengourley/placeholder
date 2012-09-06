# Placeholder image generator

Placeholder image services are useful, which means they get a lot of traffic.
Lots of traffic means the service gets hammered, and chances are, when you need
it, it will be down.

The solution? **Run your own**.

You can run this little Express app on your localhost, or on a server, giving
you your own private service, akin to [placehold.it](http://placehold.it) or [DummyImage](http://dummyimage.com/).

## Running the server

Clone this repo:

```
git clone git@github.com:bengourley/placeholder.git
```

Install the npm dependencies:

```
cd placeholder
npm install
```

Install GraphicsMagick. If you are on a Mac (If you are not on a Mac,
sorry, I can't help!):
```
brew install graphicsmagick
```

Then finally, start the server with:

```
node app
```

By default it will listen on port 9999. You can change this by passing in the
port as an environment variable:

```
PORT=1234 node app
```

## Getting images

Construct a URL like so:

```
http:// [hostname]:[port]/[width]x[height] [format] [?query=params]
```

- **hostname** - If you are on your local machine, this will be `localhost`

- **port** - By default this is `9999`. You will know if it is set to something else.

- **width** - The desired image width.

- **height** - The desired image height.

- **format** - This can be `.png`, `.jpg` or `.gif`. It is optional and defaults to `.png`

- **query** - Further options can be specified here:

    `color` - must be a hex value without the `#`. Default is 'ccc'.
    `textColor` - must be a hex value without the `#`. Default is '000'.
    `text` - The text to display. Default is '{width} x {height}'.

### Examples

- `/400x500` gets you a 400x500 .png with black text and a
grey background

- `/480x360.jpg?text=Placeholder` gets you a 480x360 .jpg displaying the
text 'Placeholder'

- `/500x100.png?color=000&textColor=fff` gets you a .png with white text
and a black background