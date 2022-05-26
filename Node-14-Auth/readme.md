## Middlewares
- https://expressjs.com/en/guide/writing-middleware.html

## Hash password
[bcrypt](https://www.npmjs.com/package/bcryptjs)
- npm install bcryptjs

const bcrypt = require('bcryptjs');
const hashedPass = bcrypt.hashSync(password, 10);


## Validator
[joi](https://www.npmjs.com/package/joi)
- npm install joi
- https://joi.dev/api/?v=17.6.0

## JWT
[jwt](https://www.npmjs.com/package/jsonwebtoken)
- npm install jsonwebtoken

- const jwt = require('jsonwebtoken');
- const token = jwt.sign({ userId: 1254 }, privateKey, {expiresIn: '1h'})
- const payload = jwt.verify(token, privateKey)

- localStorage.setItem('userToken', data.token);
- Chrome > Application > Local Storage

- https://jwt.io/
- https://www.youtube.com/watch?v=7Q17ubqLfaM

- ### Network > Fetxh/XHR > Books > Request Headers > Authorization

- generate token with node in a console for .env:
-> node 
-> require('crypto').randomBytes(64).toString('hex')

###
https://jsdoc.app/about-getting-started.html