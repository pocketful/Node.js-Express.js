const express = require('express');
const { PORT } = require('./config');
const norisRouter = require('./routes/norisRouter');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/api', norisRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
