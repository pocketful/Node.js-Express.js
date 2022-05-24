const express = require('express');
const { getAllBooks, addNewBook } = require('../models/bookModel');

const bookRoutes = express.Router();

bookRoutes.get('/books', async (req, res) => {
  let allBooksArr;
  let feedback;
  try {
    allBooksArr = await getAllBooks();
  } catch (err) {
    console.log(err);
    feedback = 'Something went wrong';
  }
  const locals = {
    title: 'Books page',
    currentPage: 'books',
    books: allBooksArr,
    feedback,
  };
  res.render('books', locals);
  //   let conn;
  //   try {
  //     conn = await mysql.createConnection(dbConfig);
  //     const sql = 'SELECT * FROM books2';
  //     const [rows] = await conn.query(sql);
  //     const locals = {
  //       title: 'Books page',
  //       currentPage: 'books',
  //       books: rows,
  //     };
  //     console.log('books ===', locals.books);
  //     res.render('books', locals);
  //   } catch (error) {
  //     console.error('Unable to get books from DB', error);
  //     res.status(500).json('Something went wrong');
  //   } finally {
  //     await conn?.end();
  //   }
});

bookRoutes.get('/books/new', async (req, res) => {
  const locals = {
    title: 'New books page',
    currentPage: 'new-book',
  };
  res.render('new-book', locals);
});

// POST /books/new - creates new book from given data
// POST /books/new - render new-book.ejs pass feedback and display feedback
bookRoutes.post('/books/new', async (req, res) => {
  console.log('req.body===', req.body);
  let feedback;
  try {
    const result = await addNewBook(req.body);
    console.log('result===', result);
    feedback = result.affectedRows === 1 ? 'New book created asuccessfully' : 'Error adding new book';
  } catch (err) {
    console.log(err);
    feedback = 'Something went wrong tryin to add new book';
  }
  const locals = {
    title: 'New books page',
    currentPage: 'new-book',
    feedback,
  };
  res.render('new-book', locals);
//   res.redirect('/books');
});

module.exports = bookRoutes;
