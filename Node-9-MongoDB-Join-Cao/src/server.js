const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const catRouter = require('./api/catRouter');
const productsRouter = require('./api/productsRouter');
const testRouter = require('./api/testRouter');

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', catRouter);
app.use('/api', productsRouter);
app.use('/api', testRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
