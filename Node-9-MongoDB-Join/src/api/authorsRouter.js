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

authorsRouter.patch('/authors/:authorId', async (req, res) => {
  try {
    const { authorId } = req.params;
    const idQuery = { _id: ObjectId(authorId) };
    const { newName } = req.body;
    const updateObjQuery = { $set: { name: newName } };
    // const updateObjQuery = { $set: { age: 20 } }; // prideti age
    // const updateObjQuery = { $inc: { age: 1 } }; // padidint 1
    // const updateObjQuery = { $set: { bookId: [ObjectId('625e5aefec4c0b1aa9863359')] } }; // i masyva sita pakeisti
    // const updateObjQuery = { $push: { bookId: ObjectId('625fd92111682ce768a0d35c') } }; // nauja knyga prideti autoriui
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const updateResult = await resource.updateOne(idQuery, updateObjQuery);
    console.log(updateResult);
    res.json(updateResult);
  } catch (error) {
    console.error('error in get books', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// PATCH /api/authors/add-book/:authorId - prideda viena knyga i autoriaus kurio id === authorId bookId masyva
authorsRouter.patch('/authors/add-book/:authorId', async (req, res) => {
  try {
    const { authorId } = req.params;
    const idQuery = { _id: ObjectId(authorId) };
    const { bookId } = req.body;
    const addNewBookQuery = { $push: { bookId: ObjectId(bookId) } };
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const updateResult = await resource.updateOne(idQuery, addNewBookQuery);
    console.log(updateResult);
    res.json(updateResult);
  } catch (error) {
    console.error('error in get books', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// GET authors-books
authorsRouter.get('/authors-books', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const agg = [
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookArr',
        },
      },
    ];
    const resource = dbClient.db(dbName).collection(collName);
    const authorsArr = await resource.aggregate(agg).toArray();
    console.log(authorsArr);
    res.json(authorsArr);
  } catch (error) {
    console.error('error in get authors-books', error);
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
