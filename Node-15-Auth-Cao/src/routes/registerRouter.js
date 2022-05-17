const express = require('express');
const { registerUser } = require('../controllers/registerController');
const validateUser = require('../middlewares/validateUser');

const registerRouter = express.Router();

registerRouter.post('/register', validateUser, registerUser);

module.exports = registerRouter;
