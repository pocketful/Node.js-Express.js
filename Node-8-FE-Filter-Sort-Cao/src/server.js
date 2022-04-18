const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const { petsRouter } = require('./api/petsRouter');

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api/', petsRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
