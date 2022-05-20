const express = require('express');

const norisRouter = express.Router();

norisRouter.get('/joke', async (req, res) => {
  res.json('test');
});

module.exports = norisRouter;
