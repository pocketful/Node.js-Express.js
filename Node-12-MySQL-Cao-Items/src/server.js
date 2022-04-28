const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const itemsRouter = require('./routes/itemsRouter');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.json('ok');
});

// Routes
app.use('/api', itemsRouter);

// When no route works, do this route, it's the last one
app.all('*', (req, res) => {
  res.status(404).json({ Error: 'Route not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
