const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// middlewares
app.use(cors()); // prevent CORS error when trying to connect from frontend
app.use(express.json()); // backend can decrypt and see JSON data. Convert JSON to JS

app.listen(PORT, () => 'Server is live on', PORT);

app.get('/', (req, res) => {
    res.send('<h1>hello express</h1>');
});

