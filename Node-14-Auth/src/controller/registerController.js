const bcrypt = require('bcryptjs');
const Joi = require('joi');
const addUserToDB = require('../models/registerModel');

// eslint-disable-next-line consistent-return
async function addUser(req, res) {
  // const { email, password } = req.body;
  let userData = req.body;

  // validate
  const userSchema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().min(3).max(255).required(),
  });

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: 'Incorrect data passed' });
  }

  try {
    const hashedPass = bcrypt.hashSync(userData.password, 10);
    console.log('hashedPass ===', hashedPass);
    const insertResult = await addUserToDB(userData.email, hashedPass);
    console.log('insertResult ===', insertResult);
    res.status(201).json({ success: true, message: 'New user successfully created' });
  } catch (err) {
    console.log('err controller', err);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

// module.exports = registerRouter;
module.exports = addUser;
