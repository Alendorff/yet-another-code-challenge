# Template Strings #
This is a es6 template string. What should be assigned to `x` such that the two conditions are `true`?


```js
let x = ‽‽‽;

`${x}` !=  '' + x // true

`${x}` !== '' + x // true
```

Answer:
> Sorry I still haven't learnt all tricky js type conversions by heart :)
> However the easiest way of breaking things like that is to redefine valueOf (or toString)
> So final code might looks like this:
```js
let x = (function() {
  const brokenThing = {}
  brokenThing.valueOf = function() {
    return Math.random()
  }
  return brokenThing
})();

`${x}` !=  '' + x; // true
`${x}` !== '' + x; // true
```
> However this is probably a little cheating and there must be some tricky js thing, about which nobody cares in real projects.
> Hope you'll share the answer with me later. I haven't mentioned this type conversion specialty before.
> P.S. I know about const x = NaN and then x !== x, isn't it cool?

# Syntax #

(found in a popular library)

``` js
…
const isAThing = typeof y === 'function' && 'something' || 'another thing';
```

Can you use a more straightforward construct to express similar semantics?

> I'm not sure if I understand this question right... it could be replaced with ternary operator, like this:
```js
const isAThing = typeof y === 'function' ? 'something' : 'another thing';
```
> This is the same thing as above, but I'm not sure if it's much more straightforward ¯\_(ツ)_/¯
> But it still does exactly the same.
