const express = require('express');

const norisRouter = express.Router();

// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

norisRouter.get('/joke', async (req, res) => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    const jokeObj = {
      joke: data.value,
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    };
    res.json(jokeObj);
  } catch (err) {
    console.log('err:', err);
  }
});

norisRouter.get('/joke-categories', async (req, res) => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log('err:', err);
  }
});

module.exports = norisRouter;
