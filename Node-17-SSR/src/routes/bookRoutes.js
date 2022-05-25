const express = require('express');

const bookRoutes = express.Router();
const controller = require('../controllers/bookControllers');

// GET /books/new - render books.ejs books list, pass feedback and display feedback
bookRoutes.get('/books', controller.showBooksPage);
// GET /books/new - render new-book.ejs add new book form
bookRoutes.get('/books/new', controller.addBookPage);
// POST /books/new - creates new book from given data
bookRoutes.post('/books/new', controller.addBook);

module.exports = bookRoutes;
