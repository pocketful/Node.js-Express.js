const express = require('express');
const axios = require('axios').default;

const reqresRouter = express.Router();

// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

reqresRouter.post('/create-user', async (req, res) => {
  const newPostObj = {
    name: req.body.name,
    job: req.body.occupation,
  };
  try {
    const resp = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostObj),
    });
    const data = await resp.json();
    console.log('data ===', data);
    return res.json({ success: true, message: 'New user added successfully.' });
  } catch (err) {
    console.log('err:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

reqresRouter.post('/create-user-axios', async (req, res) => {
  const newPostObj = {
    name: req.body.name,
    job: req.body.occupation,
  };
  try {
    // const data = await resp.json();
    const resp = await axios.post('https://reqres.in/api/users', {
      // { data }
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(newPostObj),
      newPostObj,
    });
    // console.log('resp ===', resp);
    console.log('data ===', resp.data);
    return res.json({ success: true, message: 'New user added successfully.' });
  } catch (err) {
    console.log('err:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

module.exports = reqresRouter;
