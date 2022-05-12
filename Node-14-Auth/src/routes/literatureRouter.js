const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const literatureRouter = express.Router();

literatureRouter.get('/books', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM books';
    const [rows] = await conn.execute(sql);
    console.log('rows ===', rows);
    res.json(rows);
  } catch (error) {
    console.log('Unable to get books from DB', error);
    res.status(500).json('Something went wrong');
  } finally {
    conn?.end();
  }
});

literatureRouter.get('/authors', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM authors';
    const [rows] = await conn.execute(sql);
    console.log('rows ===', rows);
    res.json(rows);
  } catch (error) {
    console.log('Unable to get authors from DB', error);
    res.status(500).json('Something went wrong');
  } finally {
    conn?.end();
  }
});

module.exports = literatureRouter;
