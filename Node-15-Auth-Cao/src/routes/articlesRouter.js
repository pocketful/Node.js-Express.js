const express = require('express');
const getArticles = require('../controllers/articlesController');
const validateToken = require('../middlewares/validateToken');

const articlesRouter = express.Router();

articlesRouter.get('/articles', validateToken, getArticles);

module.exports = articlesRouter;
