const express = require('express');
const bcrypt = require('bcryptjs');
const { addUserToDb } = require('../models/userModel');

const registerRouter = express.Router();

// app.post('/register', showBody, (req, res) => { // if with showBody
registerRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  // longer way
  // const salt = bcrypt.genSaltSync(10); // default 10
  // const hashedPass = bcrypt.hashSync(password, salt);
  // console.log('salt ===', salt);
  const hashedPass = bcrypt.hashSync(password, 10);
  console.log('hashedPass ===', hashedPass);

  const newUser = {
    email,
    password: hashedPass,
  };

  const insertResult = await addUserToDb(newUser.email, newUser.password);
  console.log('insertResult ===', insertResult);

  if (!insertResult) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('user created');
  // users.push(newUser);
});

module.exports = registerRouter;
