# Frontend Boilerplate for Mobile experience #

At the moment you just copy it into you static/public directory.

## CSS ##
We use normalize.css. In the main css is one class, `.textbox` used to define a "page in a page".

## Javascript ##
Loads a helper file for some functions that might be usefull on a mobile device.
It is from the (now defunct) mobile boiler plate generator. Some functionalities that is known to be broken has already been removed.

If you want fast taps (remove the 300ms delay between the finger is moved up and a click event is registered in the browser),
you could use fastclick from the Finacial Times labs, but think hard about it: it has 133 open issues and hasn't been updated since January 2015.
Also, modern browsers are starting to tackle the problem (ios 9.3 safari...).


Later we might use a generator to modify the file [yoga|https://github.com/metaraine/generator-yoga] looks promising, but it isn't fully fleshed out yet.
