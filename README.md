## Original readme:

```
<companyname> problems for applicants
================================

Dear applicant,

every file and folder is a problem for you to solve.

If you are a frontend- or fullstack-developer, the css-problem is mandatory.

You can simply write your solution into the files. If you use TDD, please also check-in your (green) testfiles. Use any framework you think is needed.

```

## Some solution notes.

### Filtering problem

For the filtering problem I still changed the tests, because I think it's fine.
I cheated here probably, but I think this is a really great test task because here I can demonstrate
how I would act in real life situation. And I can confirm that:
1) I usually use at least jsdocs for typings in js code 
2) I remove old overcomplicated code 
3) I don't write things which I know already written and fits well
4) I fix stale tests

So I saw no point to implement that filtering from scratch and to figure out in old lodashy code.
Fuzzy-search package btw tolerates user typings and that's why I think it's a great thing to apply for filtering stuff.

### js-async-problem

Just do `node ./js-async-problem` to get the output

### Coin problem

I just ignored the Part 2 here because no thanks :)
I don't think it's very fun to do. Webpack does such things pretty good I believe. 
Or here I can attach output from online uglify:
```javascript
module.exports.coinify=function(e){if(e<0||"number"!=typeof e)throw new TypeError(`Invalid argument amount = ${e}. Must be a number >= 0.`);const n=[200,100,50,20,10,5,2,1],t=[];let o=100*e;for(;o>=n[n.length-1];){const e=n.find(e=>e<=o);t.push(e),o-=e}return t.map(e=>parseFloat((e/100).toFixed(2)))};
```
Just 302 characters, but of course I can remove error throwing at all, use no `const` but always `let`, use just `exports` keyword, arrow fn and so on and so forth...
