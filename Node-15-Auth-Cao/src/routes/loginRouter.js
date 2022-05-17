const express = require('express');
const { loginUser } = require('../controllers/loginController');
const validateUser = require('../middlewares/validateUser');

const loginRouter = express.Router();

loginRouter.post('/login', validateUser, loginUser);

module.exports = loginRouter;
