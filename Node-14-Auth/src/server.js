const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = 3000;
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());

app.get('/', async (req, res) => {
  res.json('ok');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
