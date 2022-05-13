const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArrayFromDb(sql) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql);
    return result;
  } catch (error) {
    console.log('error in model:', error);
    throw error;
  } finally {
    conn?.end();
  }
}

async function getBooksFromDb() {
  const sql = 'SELECT * FROM books';
  return getArrayFromDb(sql);
}

async function getBooksWithAuthorsFromDb() {
  // const sql = 'SELECT * FROM books LEFT JOIN authors ON books.author_id = authors.id';
  const sql = `SELECT books.id, authors.name, authors.surname, books.title, books.year FROM books
       LEFT JOIN authors
       ON books.author_id = authors.id`;
  return getArrayFromDb(sql);
}

module.exports = {
  getBooksFromDb,
  getBooksWithAuthorsFromDb,
};
