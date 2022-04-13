const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/users', (req, res) => {
  res.json('GET /users route');
});

module.exports = usersRouter;
