const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql2/promise');
const { PORT, dbConfig } = require('./config');
const users = require('./db');

const app = express();

// Template engine
app.set('views', './src/views'); // views is default but without src
app.set('view engine', 'ejs');

// Static directory
const staticDir = path.join(__dirname, 'assets');
app.use(express.static(staticDir));

// Middleware
app.use(morgan('dev'));

// eslint-disable-next-line no-unused-vars
const mainInfo = {
  title: 'SSR',
  date: '2022',
};

app.get('/', (req, res) => {
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

app.get('/about', (req, res) => {
  const data = {
    title: 'About page',
    currentPage: 'about',
  };
  res.render('about', data); // locals
  // const pathToIndex = path.join(__dirname, 'views', 'about.html');
  // console.log(__dirname);
  // res.sendFile(pathToIndex);
});

app.get('/contacts', (req, res) => {
  const locals = {
    title: 'Contacts page',
    currentPage: 'contacts',
  };
  res.render('contacts', locals);
});

app.get('/users', (req, res) => {
  console.log('req.path =============', req.path); // /users
  const locals = {
    title: 'Users page',
    currentPage: 'users',
    users,
  };
  res.render('users', locals);
});

app.get('/posts', async (req, res) => {
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
