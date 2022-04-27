const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const postsRouter = require('./routes/postsRouter');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.json('ok');
});

// Routes
app.use('/api', postsRouter);

// When no route works, do this route, it's the last one
app.all('*', (req, res) => {
  res.status(404).json({ err: 'route not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
