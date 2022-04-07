const express = require('express');
const app = express();
const PORT = 3000;

const colors = ['red', 'green', 'blue'];
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});

app.get('/home', (request, response) => {
    response.send('Hello World');
});

app.get('/api/colors', (request, response) => {
    // console.log('request ===', request);
    console.log('request.ip ===', request.ip);
    console.log('request.hostname ===', request.hostname);
    console.log('request.method ===', request.method);
    response.json(colors);
});

app.listen(3000, () => console.log('Express is running on port', PORT));

