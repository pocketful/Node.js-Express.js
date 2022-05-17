const express = require('express');
const validateUser = require('../middlewares/validateUser');
const loginUser = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/login', validateUser, loginUser);

module.exports = loginRouter;
