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

- **height** - The desired image height. If left off, the resulting image will be square: {width} x {width}.

- **format** - This can be `.png`, `.jpg` or `.gif`. It is optional and defaults to `.png`

- **query** - Further options can be specified here:

    `color` - must be a hex value without the `#`. Default is 'ccc'.
    `textColor` - must be a hex value without the `#`. Default is '000'.
    `text` - The text to display. Default is '{width} x {height}'.

### Examples

- [/650x200](/650x200) gets you a 650x200 .png with black text and a
grey background

![650x200](/650x200)

- [/650x300.jpg?text=Placeholder+Text](/650x300.jpg?text=Placeholder+Text) gets you a 650x300 .jpg displaying the
text 'Placeholder Text'

![650x300](/650x300.jpg?text=Placeholder+Text)

- [/650x100.png?color=000&textColor=fff](/650x100.png?color=000&textColor=fff) gets you a .png with white text
and a black background

![650x100](/650x100.png?color=000&textColor=fff)

- [/250](/250) gets you a 250x250 image

![250x250](/250)

## Author
[Ben Gourley](http://github.com/bengourley)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)

[View the source on GitHub](http://github.com/bengourley/placeholder)
