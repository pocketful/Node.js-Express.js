const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;

// middleware
app.use(morgan('tiny'));
app.use(cors()); // prevent CORS error when trying to connect from frontend
// app.use(express.json()); // backend can decrypt and see JSON data. Convert JSON to JS

// import routes
const numbersRouter = require('./api/numbersRouter');
const postsRouter = require('./api/postsRouter');
// use routes
app.use('/api/numbers', numbersRouter);
app.use('/api/posts', postsRouter);

app.all('*', (req, res) => {
  res.status(404).json('Path not found');
});

app.listen(PORT, () => 'Server is live on', PORT);

app.get('/', (req, res) => {
  res.send('<h1>hello express</h1>');
});
