const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDBArr = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDBArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw new Error('error executeDb');
  } finally {
    conn?.end();
  }
}

function getAllBooks() {
  const sql = 'SELECT * FROM books2';
  return executeDb(sql);
}

module.exports = {
  getAllBooks,
};

// let conn;
// try {
//   conn = await mysql.createConnection(dbConfig);
//   const sql = 'SELECT * FROM books2';
//   const [rows] = await conn.query(sql);
//   const locals = {
//     title: 'Books page',
//     currentPage: 'books',
//     books: rows,
//   };
//   console.log('books ===', locals.books);
//   res.render('books', locals);
// } catch (error) {
//   console.error('Unable to get books from DB', error);
//   res.status(500).json('Something went wrong');
// } finally {
//   await conn?.end();
// }
