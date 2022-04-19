const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const booksRouter = require('./api/booksRouter');
const authorsRouter = require('./api/authorsRouter');

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', booksRouter);
app.use('/api', authorsRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
