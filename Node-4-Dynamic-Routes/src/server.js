const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

// middlewares
app.use(morgan('tiny'));
app.use(cors()); // prevent CORS error when trying to connect from frontend
// app.use(express.json()); // backend can decrypt and see JSON data. Convert JSON to JS

// import routes
const numbersRoute = require('./api/numbersRoute');
const postsRoute = require('./api/postsRoute');
// use routes
app.use('/api/numbers', numbersRoute);
app.use('/api/posts', postsRoute);

app.listen(PORT, () => 'Server is live on', PORT);

app.get('/', (req, res) => {
    res.send('<h1>hello express</h1>');
});
