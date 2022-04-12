require('dotenv').config(); // import dotenv, immediately read and apply the environment variables
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = +process.env.PORT || 5000;
// console.log(process.env);

// middleware
app.use(morgan('tiny'));
app.use(cors());

// import routes
const numbersRouter = require('./api/numbersRouter');
const postsRouter = require('./api/postsRouter');
// use routes
app.use('/api/numbers', numbersRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.send(`<h1>hello express ${process.env.USER}</h1>`);
});

app.all('*', (req, res) => {
  res.status(404).json('Path not found');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
