const express = require('express');
const { dbClient } = require('../config');

const productsRouter = express.Router();
const dbName = 'technologies';
const collName = 'products';

// GET // paduos visus produktus su jų kategorijom (t.y. pavadinimas, kaina, kategorija - pvz. iPhone 7, 370.00, phones).
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

// GET /categoryvalue/, šis paduos kiekvienos kategorijos produktų kainos sumą
productsRouter.get('/categoryvalue', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const catValArr = await resource
      .aggregate([
        // kiekvienos kategorijos produktų kainos sumą
        { $match: {} },
        { $group: { _id: '$category', total: { $sum: '$price' } } },
        // kiekvienos kategorijos produktų vidutine kaina
        // { $group: { _id: '$category', average: { $avg: '$price' } } },
        // { $sort: { price: -1 } },
      ])
      .toArray();

    // reduce way
    const catSumArr = catValArr.reduce((newObj, catObj) => {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      newObj[catObj._id] = catObj.total;
      return newObj;
    }, {});
    /*
    {
      "phones": 620.5,
      "tv": 3499.99
    }
    */

    // map way
    // const catSumArr = catValArr.map((catObj) => ({
    //   // eslint-disable-next-line no-underscore-dangle
    //   [catObj._id]: catObj.total,
    // }));
    /*
    [
      {
        phones: 620.5,
      },
      {
        tv: 3499.99,
      },
    ];
    */
    console.log(catSumArr);
    res.json(catSumArr);
    // console.log(catValArr);
    // res.json(catValArr);
  } catch (error) {
    console.error('error in get categories', error);
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
