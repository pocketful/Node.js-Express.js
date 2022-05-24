const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { PORT } = require('./config');
const bookRoutes = require('./routes/bookRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'src/views'); // views is default but without src

// Middleware
app.use(morgan('dev'));
// for req.body when its not JSON // JSON - app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static directory
const staticDir = path.join(__dirname, 'assets');
app.use(express.static(staticDir));

// Routes
app.use('/', pageRoutes);
app.use('/', bookRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
