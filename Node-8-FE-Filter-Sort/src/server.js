const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const usersRouter = require('./api/usersRouter');

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/', usersRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
