const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
