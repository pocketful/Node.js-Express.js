const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  const pathToIndex = path.join(__dirname, 'views', 'index.html');
  console.log(__dirname);
  res.sendFile(pathToIndex);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
