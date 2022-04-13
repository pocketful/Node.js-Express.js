require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./api/users');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan('tiny'));
app.use(cors());

// Routes
app.use('/', usersRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ err: 'not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
