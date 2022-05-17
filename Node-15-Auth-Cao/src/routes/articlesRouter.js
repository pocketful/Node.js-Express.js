const express = require('express');
const { getArticles } = require('../controllers/articlesController');

const articlesRouter = express.Router();

articlesRouter.get('/articles', getArticles);

module.exports = articlesRouter;
