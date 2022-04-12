const express = require('express');
const { posts } = require('../db/db');
const postsRoute = express.Router(); //router

module.exports = postsRoute;

// GET /posts - grazina posts masyva json formatu is db.js
postsRoute.get('/', (req, res) => {
    console.log('posts ===', posts);
    res.json(posts);
});

// GET /posts/withCategory - grazina posts masyva su papildoma savybe "category: tech"
postsRoute.get('/withCategory', (req, res) => {
    const postsWithCategory = posts.map(postObj => ({
        id: postObj.id,
        title: postObj.title,
        body: postObj.body,
        category: 'tech',
    }));
    console.log('postsWithCategory ===', postsWithCategory);
    res.json(postsWithCategory);
});

// Static way
// // GET /posts/1 - grazina post objekta kurio id yra 1
// postsRoute.get('/1', (req, res) => {
//     const foundPost = posts.find(el => el.id === 1);
//     console.log('foundPost ===', foundPost);
//     res.json(foundPost);
//     // const { getPostById } = require('./db/db');
//     // const postById = getPostById(1);
//     // console.log('postById ===', postById);
//     // res.json(postById);
// });

// Dynamic way
// GET /posts/:postId - grazina post objekta kurio id yra postId
postsRoute.get('/:postId', (req, res) => {  // bet kas kas irasyta po post id bus skaitoma kaip id
    // res.json({
    //     msg: 'dynamic',
    //     params: req.params,
    // });
    const id = +req.params.postId; // convert to a number
    const foundPost = posts.find(el => el.id === id);
    // console.log('foundPost ===', foundPost);
    if (foundPost === undefined) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }
    res.json(foundPost);
    // const { getPostById } = require('./db/db');
    // const postById = getPostById(1);
    // console.log('postById ===', postById);
    // res.json(postById);
});
