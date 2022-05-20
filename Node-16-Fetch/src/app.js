const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const norisRouter = require('./routes/norisRouter');
const reqresRouter = require('./routes/reqresRouter');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/api', norisRouter);
app.use('/api', reqresRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
