const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');
const users = require('../db/db');

const pageRoutes = express.Router();

pageRoutes.get('/', (req, res) => {
  const tech = ['HTML', 'CSS', 'JS'];
  const data = {
    tech,
    title: 'Home page',
    currentPage: 'home',
  };
  res.render('index', data); // locals
  // res.render('index', mainInfo);
  // const pathToIndex = path.join(__dirname, 'views', 'index.html');
  // console.log(__dirname);
  // res.sendFile(pathToIndex);
  // res.sendFile(__dirname + '/views/index.html'); // same, no need for path
});

pageRoutes.get('/about', (req, res) => {
  const data = {
    title: 'About page',
    currentPage: 'about',
  };
  res.render('about', data); // locals
  // const pathToIndex = path.join(__dirname, 'views', 'about.html');
  // console.log(__dirname);
  // res.sendFile(pathToIndex);
});

pageRoutes.get('/contacts', (req, res) => {
  const locals = {
    title: 'Contacts page',
    currentPage: 'contacts',
  };
  res.render('contacts', locals);
});

pageRoutes.get('/users', (req, res) => {
  console.log('req.path =============', req.path); // /users
  const locals = {
    title: 'Users page',
    currentPage: 'users',
    users,
  };
  res.render('users', locals);
});

pageRoutes.get('/posts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts';
    const [rows] = await conn.query(sql);
    const locals = {
      title: 'Posts page',
      currentPage: 'posts',
      posts: rows,
    };
    res.render('posts', locals);
  } catch (error) {
    console.error('Unable to get posts from DB', error);
    res.status(500).json('Something went wrong');
  } finally {
    await conn?.end();
  }
});

module.exports = pageRoutes;