const express = require('express');
const { getBooks, getBooksWithAuthors, addBook, getAuthorsBooksCount } = require('../controller/literatureController');

const literatureRouter = express.Router();

literatureRouter.get('/books', getBooks);
literatureRouter.get('/books-authors', getBooksWithAuthors);
literatureRouter.get('/authors-count', getAuthorsBooksCount);
literatureRouter.post('/books', addBook);

// literatureRouter.get('/authors', async (req, res) => {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = `SELECT authors.id, authors.name, authors.surname, count(books.author_id) AS 'books count' FROM authors
//     LEFT JOIN books
//     ON authors.id = books.author_id GROUP BY authors.id`;

//     // const sql = `SELECT authors.id, authors.name, authors.surname FROM authors
//     // LEFT JOIN books
//     // ON authors.id = books.author_id`;

//     // from books butu visos knygos, su null

//     // const sql = 'SELECT * FROM authors LEFT JOIN books ON authors.id = books.author_id';
//     const [rows] = await conn.execute(sql);
//     console.log('rows ===', rows);
//     res.json(rows);
//   } catch (error) {
//     console.log('Unable to get authors from DB', error);
//     res.status(500).json('Something went wrong');
//   } finally {
//     conn?.end();
//   }
// });

module.exports = literatureRouter;
