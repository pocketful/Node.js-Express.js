const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const servicesRouter = require('./api/servicesRouter');
const usersRouter = require('./api/usersRouter');

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', servicesRouter);
app.use('/api', usersRouter);

// 404 route
// app.use((req, res) => {
//   res.status(404).json({ err: 'route nor found' });
// });
app.all('*', (req, res) => {
  res.status(404).json({ err: 'route not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
