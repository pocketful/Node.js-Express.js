const express = require('express');
const cors = require('cors');
const app = express(); // initializing Express as an app called 'app' (app will be an instance of express)
const { port } = require('./config');
const { posts } = require('./data/db');
const { getById } = require('./helper/helper');
console.log('posts ===', posts);

// middlewares
app.use(cors()); // prevent CORS error when trying to connect from FrontEnd
app.use(express.json()); // BackEnd can decrypt and see JSON data. Convert JSON to JS

// activates this server, listening on port for requests 
app.listen(port, () => console.log('Server is running on port', port));

app.get('/', (request, response) => {
    response.json('Hey');
});

// posts routes
app.get('/api/posts', postsController);

// get post by id
app.get('/api/posts/33', (request, response) => {
    const postId = 33;
    const foundPost = getById(posts, postId);
    const result = foundPost === false ? 'Post not found' : foundPost;
    response.json(result);
});

// post
app.post('/api/posts', (request, response) => {
    const newPostObj = request.body;
    console.log('newPostObj ===', newPostObj);
    posts.push(newPostObj);
    response.status(201).json({
        success: true,
        msg: 'Post created',
    });
});


function postsController(request, response) {
    response.json(posts);
} 
