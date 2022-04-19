const express = require('express');
const { ObjectId } = require('mongodb');
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

// GET books-authors
booksRouter.get('/books-authors', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const agg = [
      {
        $lookup: {
          from: 'authors',
          localField: '_id',
          foreignField: 'bookId',
          as: 'authorArr',
        },
      },
    ];
    const resource = dbClient.db(dbName).collection(collName);
    const booksArr = await resource.aggregate(agg).toArray();
    console.log(booksArr);
    res.json(booksArr);
  } catch (error) {
    console.error('error in get books-authors', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// GET /api/books/:bookId
booksRouter.get('/books/:bookId', async (req, res) => {
  try {
    const id = req.params.bookId;
    console.log('connection opened');
    console.log('id', id);
    const query = { _id: ObjectId(id) };
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const bookById = await resource.findOne(query);
    console.log(bookById);
    res.json(bookById);
  } catch (error) {
    console.error('error in get a book by id', error);
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
