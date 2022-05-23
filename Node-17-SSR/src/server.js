const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { PORT } = require('./config');
const users = require('./db');

const app = express();

// Set default view engine - /views
app.set('views', './src/views');
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
  };
  res.render('index', data);
  // res.render('index', mainInfo);
  // const pathToIndex = path.join(__dirname, 'views', 'index.html');
  // console.log(__dirname);
  // res.sendFile(pathToIndex);
});

app.get('/about', (req, res) => {
  const data = {
    title: 'About page',
  };
  res.render('about', data);
  // const pathToIndex = path.join(__dirname, 'views', 'about.html');
  // console.log(__dirname);
  // res.sendFile(pathToIndex);
});

app.get('/contacts', (req, res) => {
  const locals = {
    titles: 'Contacts page',
  };
  res.render('contacts', locals);
});

app.get('/users', (req, res) => {
  const locals = {
    users,
  };
  res.render('users', locals);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
