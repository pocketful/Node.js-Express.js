const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const bookRoutes = express.Router();

bookRoutes.get('/books', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM books2';
    const [rows] = await conn.query(sql);
    const locals = {
      title: 'Books page',
      currentPage: 'books',
      books: rows,
    };
    console.log('books ===', locals.books);
    res.render('books', locals);
  } catch (error) {
    console.error('Unable to get books from DB', error);
    res.status(500).json('Something went wrong');
  } finally {
    await conn?.end();
  }
});

module.exports = bookRoutes;
