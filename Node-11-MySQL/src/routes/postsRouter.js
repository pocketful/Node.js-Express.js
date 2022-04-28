const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const postsRouter = express.Router();

postsRouter.get('/posts', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `posts`';
    // const result = await conn.query(sql);
    // const [rows, fields] = await conn.query(sql);
    const [rows] = await conn.query(sql);
    // console.log('rows ===', rows);
    await conn.end();
    console.log('connection ended');
    res.json(rows);
    // res.json(result[0]);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
    // } finally {
    //   await conn?.end();
    //   // if (conn) await conn.end();
  }
});

postsRouter.get('/posts/first-posts', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `posts` LIMIT 2';
    const [rows] = await conn.query(sql);
    console.log('rows ===', rows);
    await conn.end();
    console.log('connection ended');
    res.json(rows);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  }
});

// http://localhost:3000/api/posts/posts-by-rating?order=ASC&limit=5
postsRouter.get('/posts/posts-by-rating/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    console.log('req.query ===', req.query); // { order: 'ASC', limit: '5' }
    console.log('req.params ===', req.query.order); // ASC
    // console.log('req.params ===', req.query.limit); // 5
    const { order } = req.query;
    // const { limit } = req.query;

    // const safeOrder = mysql.escape(order); // no need for execute after this
    // const ascOrDesc = safeOrder === 'ASC' ? 'ASC' : 'DESC';
    // console.log('order ===', order); // ASC
    // console.log('safeOrder ===', safeOrder); // 'ASC'
    // console.log('safeOrder === ASC', safeOrder === 'ASC'); // ASC false ?

    const sql = `SELECT * FROM posts ORDER BY rating ${order === 'ASC' ? 'ASC' : 'DESC'}`;
    console.log('sql ===', sql);
    const [rows] = await conn.query(sql);

    // const sql = 'SELECT * FROM posts ORDER BY rating DESC';
    // const [rows] = await conn.query(sql);
    // console.log('rows ===', rows);

    await conn.end();
    console.log('connection ended');
    res.json(rows);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  }
});

// get posts from author dynamic
postsRouter.get('/posts/author/:author', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const { author } = req.params;
    // const sql = `SELECT * FROM posts WHERE author = '${author}'`;
    // const [rows] = await conn.query(sql);
    // Be aware of SQL injection
    const sql = 'SELECT * FROM posts WHERE author = ?';
    const [rows] = await conn.execute(sql, [author]);
    // console.log('rows ===', rows);
    await conn.end();
    console.log('connection ended');
    res.json(rows);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  }
});

// get all posts or posts from author? if its included
postsRouter.get('/posts/author/:author?', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const { author } = req.params;
    // const sql = author ? `SELECT * FROM posts WHERE author = '${author}'` : 'SELECT * FROM posts';
    // const [rows] = await conn.query(sql);
    // Be aware of SQL injection
    const sql = author ? 'SELECT * FROM posts WHERE author = ?' : 'SELECT * FROM posts';
    // const sql = `SELECT * FROM posts ${author ? 'WHERE author = ?' : ''}`;
    const [rows] = author ? await conn.execute(sql, [author]) : await conn.query(sql);
    // console.log('rows ===', rows);
    await conn.end();
    console.log('connection ended');
    res.json(rows);
  } catch (error) {
    console.error('Error in getting posts from DB', error);
    res.status(500).json('Something went wrong');
  }
});

/* POST --------------------------------------------------------------------------------- */
postsRouter.post('/posts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    // eslint-disable-next-line object-curly-newline
    const { author, title, body, rating } = req.body;
    const sql = 'INSERT INTO posts (author, title, body, rating) VALUES (?, ?, ?, ?)';
    const [insertResult] = await conn.execute(sql, [author, title, body, rating]);

    // 1 way Possibility of SQL injection:
    // const sql = `INSERT INTO posts (author, title, body, rating) VALUES ('Ron', 'Post 12', 'Body of post 12', 1)`;
    // const [insertResult] = await conn.query(sql);

    // 2 way
    // const newPost = req.body;
    // console.log('newPost ===', newPost);
    // console.log('Object.values(newPost) ===', Object.values(newPost));
    // const [insertResult] = await conn.execute(sql, Object.values(newPost));

    // 3 way, shorter
    // const sql = 'INSERT INTO posts SET ?';
    // const insertResult = await conn.query(sql, newPost); // const insertResult = await conn.execute(sql, [newPost]); // NOT WORKIN'

    if (insertResult.affectedRows === 1) {
      console.log(insertResult);
      res.status(201).json({ success: true }); // 201 Created
      return;
    }
    if (insertResult.affectedRows === 0) {
      console.log(insertResult);
      res.status(400).json({ success: false, error: "Post wasn't created" }); // 400 Bad Request
      return;
    }
    throw new Error('Unable to create new post');
  } catch (error) {
    console.error(error);
    res.status(500).json('Unable to create new post'); // 500 Internal Server Error
  } finally {
    await conn?.end(); // if (conn) await conn.end();
    console.log('connection ended');
  }
});

module.exports = postsRouter;
