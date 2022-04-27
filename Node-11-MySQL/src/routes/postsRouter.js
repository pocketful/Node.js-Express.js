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

postsRouter.get('/posts/first-posts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `posts` LIMIT 2';
    const [rows] = await conn.query(sql);
    console.log('rows ===', rows);
    res.json(rows);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  } finally {
    if (conn) await conn.end();
    console.log('connection ended');
  }
});

postsRouter.get('/posts/posts-by-rating', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `posts` ORDER BY rating DESC';
    const [rows] = await conn.query(sql);
    console.log('rows ===', rows);
    res.json(rows);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  } finally {
    if (conn) await conn.end();
    console.log('connection ended');
  }
});

// get posts from author dynamic
postsRouter.get('/posts/author/:author', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const { author } = req.params;
    // const sql = `SELECT * FROM posts WHERE author = '${author}'`;
    // const [rows] = await conn.query(sql);
    // Be aware of SQL injection
    const sql = 'SELECT * FROM posts WHERE author = ?';
    const [rows] = await conn.execute(sql, [author]);
    // console.log('rows ===', rows);
    res.json(rows);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  } finally {
    if (conn) await conn.end();
    console.log('connection ended');
  }
});

// get all posts or posts from author? if its included
postsRouter.get('/posts/author/:author?', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const { author } = req.params;
    // const sql = author ? `SELECT * FROM posts WHERE author = '${author}'` : 'SELECT * FROM posts';
    // const [rows] = await conn.query(sql);
    // Be aware of SQL injection
    const sql = author ? 'SELECT * FROM posts WHERE author = ?' : 'SELECT * FROM posts';
    const [rows] = author ? await conn.execute(sql, [author]) : await conn.query(sql);
    // console.log('rows ===', rows);
    res.json(rows);
  } catch (error) {
    console.error('error in getting posts from DB', error);
    res.status(500).json('something went wrong');
  } finally {
    if (conn) await conn.end();
    console.log('connection ended');
  }
});

module.exports = postsRouter;
