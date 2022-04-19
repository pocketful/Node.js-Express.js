const express = require('express');
const { dbClient } = require('../config');

const catRouter = express.Router();
const dbName = 'technologies';
const collName = 'categories';

// GET
catRouter.get('/categories', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const categorArr = await resource.find().toArray();
    // console.log(categorArr);
    res.json(categorArr);
  } catch (error) {
    console.error('error in get categories', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

module.exports = catRouter;
