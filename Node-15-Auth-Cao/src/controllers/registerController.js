const bcrypt = require('bcryptjs');
const { registerUserDb } = require('../models/registerModel');

async function registerUser(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPass = bcrypt.hashSync(password);
    const insertResult = await registerUserDb(email, hashedPass);
    console.log('insertResult:', insertResult);
    return res.status(201).json({ success: true, message: 'New user successfully created.' });
  } catch (err) {
    console.log('err adding new user:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    if (err.errno === 1062) {
      return res
        .status(400)
        .json({ success: false, message: 'An account with this email already exists.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  registerUser,
};
