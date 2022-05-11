const bcrypt = require('bcryptjs');
const findUserByEmailDB = require('../models/loginModel');

async function findUserByEmail(req, res) {
  const emailReceived = req.body.email;
  const passwordReceived = req.body.password;
  // check if email exists
  const foundUser = await findUserByEmailDB(emailReceived);
  console.log('foundUser ===', foundUser);
  if (!foundUser) {
    res.status(400).json({ error: 'Email or password not found (test:email)' });
    return;
  }
  // if email exists then check if passwords match
  // load hash from your password DB
  // bcrypt.compareSync('pass input', 'saved hashed pass'); // true false
  if (!bcrypt.compareSync(passwordReceived, foundUser.password)) {
    res.status(400).json({ error: 'Email or password not found (test:pass)' });
    return;
  }
  res.json('login success');
}

module.exports = findUserByEmail;
