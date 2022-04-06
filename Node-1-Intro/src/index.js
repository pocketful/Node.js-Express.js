// https://nodejs.org/dist/latest-v17.x/docs/api/

// CommonJS (CJS) export:   module.exports = {sum} OR sum          // when default - sum without {}
// CommonJS (CJS) import:   const sum = require('./fn')

// ES6 module export:       export OR export default
// ES6 module import:       import {sum} OR sum from './fn.js'     // when default - sum without {}


// import add() and baseUrl from /fn all at once
const fn = require('./fn');
console.log('fn ===', fn);
console.log('fn.baseUrl ===', fn.baseUrl);
console.log('fn.add(20, 50) ===', fn.add(20, 50));

// import add() and baseUrl from /fn separately
const { add, baseUrl } = require('./fn');
console.log('baseUrl ===', baseUrl);
console.log('add(20, 50); ===', add(20, 50));

// import generateUser() from casual
const { generateUser } = require('./casual');
console.log('generateUser() ===', generateUser());


