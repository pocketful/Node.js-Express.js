const express = require('express');
const findUserByEmail = require('../controller/loginController');
const { validateUser } = require('../middlewares');
// const bcrypt = require('bcryptjs');
// const findUserByEmailDB = require('../models/loginModel');

const loginRouter = express.Router();

loginRouter.post('/login', validateUser, findUserByEmail);

// loginRouter.post('/login', async (req, res) => {
//   const emailReceived = req.body.email;
//   const passwordReceived = req.body.password;
//   // check if email exists
//   const foundUser = await findUserByEmailDB(emailReceived);
//   console.log('foundUser ===', foundUser);
//   // const foundUser = users.find((userObj) => userObj.email === emailReceived); // with temp array db
//   if (!foundUser) {
//     res.status(400).json({ error: 'Email or password not found (test:email)' });
//     return;
//   }
//   // when pass not encrypted:
//   // if email exists then check if passwords match
//   // if (foundUser.password !== passwordReceived) {
//   //   res.status(400).json({ error: 'Email or password not found (test:pass)' });
//   //   return;
//   // }

//   // if email exists then check if passwords match
//   // load hash from your password DB
//   // bcrypt.compareSync('pass input', 'saved hashed pass'); // true false
//   if (!bcrypt.compareSync(passwordReceived, foundUser.password)) {
//     res.status(400).json({ error: 'Email or password not found (test:pass)' });
//     return;
//   }
//   res.json('login success');
// });

module.exports = loginRouter;
