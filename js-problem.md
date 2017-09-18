# Template String Semantics #

This is an es6 template string. What should be assigned to `x` such that there is no console output?

    let x = ‽‽‽;

    console.assert(`${x}` !=  '' + x, 'Does not work with !=')

    console.assert(`${x}` !== '' + x, 'Does not work with !==')

