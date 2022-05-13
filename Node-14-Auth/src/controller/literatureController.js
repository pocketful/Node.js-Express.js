const { getBooksFromDb, getBooksWithAuthorsFromDb, addBookToDb } = require('../models/literatureModel');

// eslint-disable-next-line consistent-return
async function getBooks(req, res) {
  try {
    const getResult = await getBooksFromDb();
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
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

// eslint-disable-next-line consistent-return
async function addBook(req, res) {
  try {
    const insertResult = await addBookToDb(req.body);
    console.log('insertResult:', insertResult);
    res.status(201).json({ success: true, message: 'New book added successfully.' });
  } catch (err) {
    console.log('err adding new book:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getBooks,
  getBooksWithAuthors,
  addBook,
};
