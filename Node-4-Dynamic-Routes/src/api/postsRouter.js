const express = require('express');
const { posts } = require('../db/db');

const postsRouter = express.Router(); // router

module.exports = postsRouter;

// GET /posts - grazina posts masyva json formatu is db.js
postsRouter.get('/', (req, res) => {
  console.log('posts ===', posts);
  res.json(posts);
});

// GET /posts/withCategory - grazina posts masyva su papildoma savybe "category: tech"
postsRouter.get('/withCategory', (req, res) => {
  const postsWithCategory = posts.map((postObj) => ({
    id: postObj.id,
    title: postObj.title,
    body: postObj.body,
    category: 'tech',
  }));
  res.json(postsWithCategory);
});

// GET /posts/:postId - grazina post objekta kurio id yra postId
postsRouter.get('/:postId', (req, res) => { // bet kas kas irasyta po post id bus skaitoma kaip id
  // res.json({
  //     msg: 'dynamic',
  //     params: req.params,
  // });
  const id = +req.params.postId; // convert to a number
  const foundPost = posts.find((el) => el.id === id);
  if (foundPost === undefined) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  res.json(foundPost);
});
