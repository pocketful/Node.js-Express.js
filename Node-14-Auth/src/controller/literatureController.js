const { getBooksFromDb, getBooksWithAuthorsFromDb } = require('../models/literatureModel');

// eslint-disable-next-line consistent-return
async function getBooks(req, res) {
  try {
    const getResult = await getBooksFromDb();
    // console.log('getResult ===', getResult);
    // res.status(200).json({ success: true, message: 'Your result.' });
    // res.status(200).json(getResult);
    res.json(getResult);
  } catch (err) {
    console.log('Unable to get books:', err);
    // console.log('Error:', err.stack);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

// eslint-disable-next-line consistent-return
async function getBooksWithAuthors(req, res) {
  try {
    const getResult = await getBooksWithAuthorsFromDb();
    res.json(getResult);
  } catch (err) {
    console.log('Unable to get books with authors:', err);
    // console.log('Error:', err.stack);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getBooks,
  getBooksWithAuthors,
};
