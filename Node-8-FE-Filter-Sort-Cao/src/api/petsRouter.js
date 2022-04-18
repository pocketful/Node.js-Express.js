const express = require('express');
const { dbClient } = require('../config');

const petsRouter = express.Router();
const dbName = 'caDB';
const collName = 'pets';

// Routes
petsRouter.get('/pets', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const petsArr = await resource.find().toArray();
    console.log(petsArr);
    res.json(petsArr);
  } catch (error) {
    console.error('error in get pets', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

module.exports = {
  petsRouter,
};
