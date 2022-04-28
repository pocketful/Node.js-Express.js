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

postsRouter.get('/posts/posts-by-rating', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `posts` ORDER BY rating DESC';
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
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
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
      res.status(201).json(insertResult);
      return;
    }
    throw new Error('affected row not 1');
  } catch (error) {
    console.error('error in creating new post', error);
    res.sendStatus(500);
  } finally {
    await conn?.end(); // if (conn) await conn.end();
    console.log('connection ended');
  }
});

module.exports = postsRouter;
