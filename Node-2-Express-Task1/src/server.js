const express = require('express');
const cors = require('cors');
const casual = require('casual');
const app = express(); // initializing Express as an app called 'app' (app will be an instance of express)
const PORT = 3000;

// middleware 
app.use(cors());

// activates this server, listening on port for requests 
// start app, listen to requests  
app.listen(PORT, () => console.log('Server is running on port', PORT));

// sukuriam enpointa GET '/' kuris grazina "`<h1>Sveiki is back end</h1>`"
app.get('/', (request, response) => {
    response.send('<h1>Sveiki is back end</h1>');
});

const posts = [
    {
      id: 1,
      title: 'Post 1',
      body: 'This is Post 1 body and it is all about Post 1',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'This is Post 2 body and it is all about Post 2',
    },
    {
      id: 3,
      title: 'Post 3',
      body: 'This is Post 3 body and it is all about Post 3',
    },
    {
      id: 4,
      title: 'ExpressJs',
      body: 'Express is easy way to make back end',
    },
];

// sukuriam endpointa GET /posts kuris grazina json masyva su 3 postais is 4
app.get('/posts', (request, response) => {
    response.json(posts.slice(0, -1));
});

// sukuriam endpointa GET /api/towns kuris grazina random miesta is npm casual
app.get('/api/city', (request, response) => {
    response.json(casual.city);
});
