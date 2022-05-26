const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const servicesRouter = require('./api/servicesRouter');
const usersRouter = require('./api/usersRouter');
const usersMembershipsRouter = require('./api/usersMembershipsRouter');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', servicesRouter);
app.use('/api', usersRouter);
app.use('/api', usersMembershipsRouter);

// When no route works, do this route, it's the last one
// 404 route
// app.use((req, res) => {
//   res.status(404).json({ err: 'route not found' });
// });
// better one
app.all('*', (req, res) => {
  res.status(404).json({ err: 'route not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
