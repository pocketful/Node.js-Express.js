const express = require('express');
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
// https://www.npmjs.com/package/cors
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware 
app.use(cors());

const colors = ['red', 'green', 'blue'];

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});

app.get('/home', (request, response) => {
    response.send('Hello World');
});

app.get('/api/colors', (request, response) => {
    let error = false;
    // console.log('request ===', request);
    // console.log('request.ip ===', request.ip);
    // console.log('request.hostname ===', request.hostname);
    // console.log('request.method ===', request.method);
    if (!error) {
        const answer = {
            success: true,
            colors,
        };
        response.json(answer);
    } else {
        const answer = {
            success: false,
            error: 'Something bad happened',
        };
        response.status(400).json(answer);
    }
});

app.listen(3000, () => console.log('Express is running on port', PORT));

