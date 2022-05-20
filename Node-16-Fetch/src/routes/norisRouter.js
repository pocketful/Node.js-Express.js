const express = require('express');
const axios = require('axios').default;

const norisRouter = express.Router();

// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

norisRouter.get('/joke', async (req, res) => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    const jokeObj = {
      joke: data.value,
      icon_url: data.icon_url,
    };
    return res.json(jokeObj);
  } catch (err) {
    console.log('err:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

norisRouter.get('/joke-axios', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.chucknorris.io/jokes/random');
    const jokeObj = {
      joke: data.value,
      icon_url: data.icon_url,
    };
    console.log(jokeObj);
    return res.json(jokeObj);
    // const response = await axios.get('https://api.chucknorris.io/jokes/random');
    // console.log(response.data.value);
    // res.json(response.data);
  } catch (err) {
    console.log('err:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
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
