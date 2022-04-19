const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const authorsRouter = express.Router();
const dbName = 'library';
const collName = 'authors';

// Routes
// GET
authorsRouter.get('/authors', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const authorsArr = await resource.find().toArray();
    // console.log(authorsArr);
    res.json(authorsArr);
  } catch (error) {
    console.error('error in get authors', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// GET /api/authors/:authorId
authorsRouter.get('/authors/:authorId', async (req, res) => {
  try {
    const id = req.params.authorId;
    console.log('connection opened');
    const query = { _id: ObjectId(id) };
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const authorById = await resource.findOne(query);
    console.log(authorById);
    res.json(authorById);
  } catch (error) {
    console.error('error in get author by id', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// POST
authorsRouter.post('/authors', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const newPostObj = req.body;
    newPostObj.bookId = ObjectId(newPostObj.bookId); // we get string id, but we need ObjectId
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

module.exports = authorsRouter;
