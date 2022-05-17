const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');
const findUserByEmailDB = require('../models/loginModel');

async function findUserByEmail(req, res) {
  const emailReceived = req.body.email;
  const passwordReceived = req.body.password;
  try {
    // check if user with this email exists
    const foundUser = await findUserByEmailDB(emailReceived);
    // console.log('foundUser ===', foundUser);

    if (!foundUser) throw new Error(400);
    // if (!foundUser) {
    //   console.log("email wasn't found");
    //   // return res.status(400).json({ success: false, message: 'Wrong email or password.' });
    // }

    // if email exists then check if passwords match
    // load hash from your password DB
    // bcrypt.compareSync('pass input', 'saved hashed pass'); // true false

    if (!bcrypt.compareSync(passwordReceived, foundUser.password)) throw new Error(400);
    // if (!bcrypt.compareSync(passwordReceived, foundUser.password)) {
    //   console.log("passwords doesn't match");
    //   // return res.status(400).json({ success: false, message: 'Wrong email or password.' });
    // }

    // jwt token
    // const payload = { userId: foundUser.id };
    const token = jwt.sign({ userId: foundUser.id }, privateKey, { expiresIn: '1h' });

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

module.exports = findUserByEmail;
