/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArrayFromDb(sql) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, []);
    return result;
  } catch (error) {
    console.log('error in model:', error);
    throw error;
  } finally {
    conn?.end();
  }
}

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
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

async function getAuthorsBooksCountFromDb() {
  const sql = `SELECT authors.name, authors.surname, COUNT(books.id) AS 'books_count' FROM authors 
    LEFT JOIN books 
    ON books.author_id = authors.id 
    GROUP BY authors.id`;
  return getArrayFromDb(sql);
}

async function addBookToDb(newBookObj) {
  const { title, year, author_id } = newBookObj;
  //   const sql = `INSERT INTO books (title, year, author_id) VALUES ("Philosopher's Stone", 1997, 5)`;
  const sql = 'INSERT INTO books (title, year, author_id) VALUES (?, ?, ?)';
  return executeDb(sql, [title, year, author_id]);
}

module.exports = {
  getBooksFromDb,
  getBooksWithAuthorsFromDb,
  addBookToDb,
  getAuthorsBooksCountFromDb,
};
