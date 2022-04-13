require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const usersRouter = express.Router();

const dbClient = new MongoClient(process.env.MONGO_DB_STRING);

usersRouter.get('/users', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    res.json('connection ok');
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

module.exports = usersRouter;
