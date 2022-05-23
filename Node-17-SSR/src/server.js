const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { PORT } = require('./config');

const app = express();

// Set default view engine - /views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Static directory
const staticDir = path.join(__dirname, 'assets');
app.use(express.static(staticDir));

// Middleware
app.use(morgan('dev'));

const mainInfo = {
  title: 'SSR',
  date: '2022',
};

app.get('/', (req, res) => {
  res.render('index', mainInfo);
  // const pathToIndex = path.join(__dirname, 'views', 'index.html');
  // console.log(__dirname);
  // res.sendFile(pathToIndex);
});

app.get('/about', (req, res) => {
  res.render('about');
  // const pathToIndex = path.join(__dirname, 'views', 'about.html');
  // console.log(__dirname);
  // res.sendFile(pathToIndex);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
