const bcrypt = require('bcryptjs');
// const Joi = require('joi');
const addUserToDB = require('../models/registerModel');

// eslint-disable-next-line consistent-return
async function addUser(req, res) {
  const { email, password } = req.body;
  // validation moved to middleware
  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    const insertResult = await addUserToDB(email, hashedPass);
    console.log('insertResult:', insertResult);
    res.status(201).json({ success: true, message: 'New user successfully created.' });
  } catch (err) {
    console.log('err adding new user:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    if (err.errno === 1062) { // if (err.errno === 1062) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

// module.exports = registerRouter;
module.exports = addUser;
