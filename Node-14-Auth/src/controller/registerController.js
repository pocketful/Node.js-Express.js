const bcrypt = require('bcryptjs');
const addUserToDB = require('../models/registerModel');

async function addUser(req, res) {
  console.log('addUser controller ran');
  const { email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);
  console.log('hashedPass ===', hashedPass);
  const newUser = {
    email,
    password: hashedPass,
  };
  const insertResult = await addUserToDB(newUser.email, newUser.password);
  // console.log('insertResult ===', insertResult);
  if (!insertResult) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('user created');
}

// module.exports = registerRouter;
module.exports = addUser;
