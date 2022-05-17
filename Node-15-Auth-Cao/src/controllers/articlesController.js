const { getArticlesDb } = require('../models/articlesModel');

async function getArticles(req, res) {
  try {
    const articles = await getArticlesDb();
    return res.json(articles);
  } catch (err) {
    console.log('unable to get articles:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getArticles,
};
