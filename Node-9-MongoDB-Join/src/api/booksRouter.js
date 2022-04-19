const express = require('express');
const { dbClient } = require('../config');

const booksRouter = express.Router();
const dbName = 'library';
const collName = 'books';

// Routes
// GET
booksRouter.get('/books', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const booksArr = await resource.find().toArray();
    // console.log(booksArr);
    res.json(booksArr);
  } catch (error) {
    console.error('error in get books', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// POST
booksRouter.post('/books', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const newPostObj = req.body;
    const resource = dbClient.db(dbName).collection(collName);
    const insertResult = await resource.insertOne(newPostObj);
    console.log('insertResult ===', insertResult);
    res.json(insertResult);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

module.exports = booksRouter;
