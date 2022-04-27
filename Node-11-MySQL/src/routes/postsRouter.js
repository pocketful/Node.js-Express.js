const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const postsRouter = express.Router();

postsRouter.get('/posts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `posts`';
    // const result = await conn.query(sql);
    // const [rows, fields] = await conn.query(sql);
    const [rows] = await conn.query(sql);
    console.log('rows ===', rows);
    res.json(rows);
    // res.json(result[0]);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  } finally {
    await conn?.end();
    // if (conn) await conn.end();
    // await conn.end();
    console.log('connection ended');
  }
});

module.exports = postsRouter;
