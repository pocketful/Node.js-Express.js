const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./api/users');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/', usersRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ err: 'not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
