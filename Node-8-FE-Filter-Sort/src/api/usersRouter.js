const express = require('express');

const usersRouter = express.Router();

// Routes
usersRouter.get('/users', async (req, res) => {
  res.json('get users route');
});

module.exports = usersRouter;
