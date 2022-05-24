const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { PORT } = require('./config');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

app.use('/', pageRoutes);

// Template engine
app.set('views', './src/views'); // views is default but without src
app.set('view engine', 'ejs');

// Static directory
const staticDir = path.join(__dirname, 'assets');
app.use(express.static(staticDir));

// Middleware
app.use(morgan('dev'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
