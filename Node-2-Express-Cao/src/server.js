const express = require('express');
const app = express();
// const app = require('express')();
const PORT = 3000;
const cors = require('cors');
// middleware 
app.use(cors());

app.listen(PORT, () => console.log('The server is running on port', PORT));

// NodeJS projektas, kuris GET / paduos automobilių brandus 
app.get('/', (req, res) => {
    const carsArr = ['BMW', 'VW', 'Porsche'];
    // res.send(carsArr);
    res.json(carsArr);
})
