const express = require('express');
const { dbClient } = require('../config');

const productsRouter = express.Router();
const dbName = 'technologies';
const collName = 'products';

// GET
productsRouter.get('/products', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const productsArr = await resource.find().toArray();
    // console.log(productsArr);
    res.json(productsArr);
  } catch (error) {
    console.error('error in get products', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// POST
productsRouter.post('/products', async (req, res) => {
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

module.exports = productsRouter;
