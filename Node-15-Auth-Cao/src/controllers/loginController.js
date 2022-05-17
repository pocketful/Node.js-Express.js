const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');
const { loginUserDb } = require('../models/loginModel');

async function loginUser(req, res) {
  const emailInput = req.body.email;
  console.log('emailInput ===', emailInput);
  const passwordInput = req.body.password;

  try {
    // if user with this email exists
    const foundUser = await loginUserDb(emailInput);
    console.log('user with this email ===', foundUser);
    if (!foundUser) throw new Error(400);

    // if passwords match
    if (!bcrypt.compareSync(passwordInput, foundUser.password)) throw new Error(400); // load hashed password from your DB

    // signing jwt token
    const token = jwt.sign({ userId: foundUser.id }, privateKey, { expiresIn: '1h' }); // const payload = { userId: foundUser.id };

    return res.json({ success: true, message: 'Login success.', token });
    // return res.sendStatus(303); // server is redirecting the user agent to a different resource
  } catch (err) {
    console.log('error in login controller:', err); // err.name, err.message
    if (err.message === '400') {
      return res.status(400).json({ success: false, message: 'Wrong email or password.' });
    }
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = loginUser;
