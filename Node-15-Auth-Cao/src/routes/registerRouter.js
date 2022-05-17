const express = require('express');
const validateUser = require('../middlewares/validateUser');
const registerUser = require('../controllers/registerController');

const registerRouter = express.Router();

registerRouter.post('/register', validateUser, registerUser);

module.exports = registerRouter;
