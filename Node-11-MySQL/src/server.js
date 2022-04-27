const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json('OK'));

// Routes

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
