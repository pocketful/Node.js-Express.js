const bcrypt = require('bcryptjs');
// const Joi = require('joi');
const addUserToDB = require('../models/registerModel');

// eslint-disable-next-line consistent-return
async function addUser(req, res) {
  const { email, password } = req.body;

  // validate
  // const userSchema = Joi.object({
  //   // eslint-disable-next-line newline-per-chained-call
  //   email: Joi.string().email().trim().lowercase().required(),
  //   password: Joi.string().min(3).max(255).required(),
  // });

  // try {
  //   await userSchema.validateAsync(req.body, { abortEarly: false });
  // } catch (err) {
  //   console.log('validate err ===', err);
  //   return res.status(400).json({ success: false, message: err.details });
  // }

  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    console.log('hashedPass ===', hashedPass);
    const insertResult = await addUserToDB(email, hashedPass);
    console.log('insertResult ===', insertResult);
    res.status(201).json({ success: true, message: 'New user successfully created' });
  } catch (err) {
    console.log('err controller', err);
    console.log('err controller sql ===', err.sqlMessage);
    // if (err.errno === 1054) { // if (err.errno === 1062) {
    //   console.log('column error');
    //   return res.sendStatus(400);
    // }
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

// module.exports = registerRouter;
module.exports = addUser;
