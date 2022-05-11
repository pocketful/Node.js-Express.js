const bcrypt = require('bcryptjs');
const addUserToDB = require('../models/registerModel');
const Joi = require('joi');

async function addUser(req, res) {
  console.log('addUser controller ran');
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
    return res.status(400).json('Incorrect data passed');
  }
  console.log('userData ===', userData);

  try {
    const hashedPass = bcrypt.hashSync(userData.password, 10);
    console.log('hashedPass ===', hashedPass);
    const insertResult = await addUserToDB(userData.email, userData.password);
    console.log('insertResult ===', insertResult);
    res.status(201).json('user created');
  } catch (err) {
    console.log('err controller', err);
    return res.status(500).json('something went wrong');
  }
}

// module.exports = registerRouter;
module.exports = addUser;
