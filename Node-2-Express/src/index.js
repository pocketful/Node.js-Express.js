const express = require('express');
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
// https://www.npmjs.com/package/cors
const cors = require('cors');
// initializing Express as an app called 'app' (app will be an instance of express)
const app = express();
const PORT = 3000;

// middleware 
app.use(cors());

const colors = ['red', 'green', 'blue'];

// create endpoint app.METHOD(PATH, HANDLER)
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

// one color
app.get('/api/colors/1', (request, response) => {
    response.json(colors[0]);
});

// 404 case
app.all('*', (request, response) => {
    console.log('request.originalUrl ===', request.originalUrl);
    const urlPage = request.originalUrl.slice(1);
    response.status(404).json({
        success: false,
        error: `You have tried to see page ${urlPage}. This page is not found`,
    });
});

// activates this server, listening on port for requests 
app.listen(3000, () => console.log('Express is running on port', PORT));
