const express = require('express');
const { getAllBooks } = require('../models/bookModel');

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

module.exports = bookRoutes;
