// https://www.mikedane.com/databases/mongodb/aggregation/
// https://www.youtube.com/watch?v=Kk6Er0c7srU&t=2s

const express = require('express');
const { dbClient } = require('../config');

const testRouter = express.Router();
const dbName = 'technologies';
const collName = 'test';

// GET
testRouter.get('/test', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    // Find all
    const testArr = await resource.find().toArray();

    // // How many toothbrushes were sold
    // const testArr = await resource.count({ product: 'toothbrush' });

    // // How many toothbrushes were sold without duplicates
    // const testArr = await resource.distinct('product');

    // // Find the total amount of money spent by each customer // [{"_id": "Mike","total": 20.83}...]
    // const testArr = await resource
    //   .aggregate([
    //     { $match: {} },
    //     { $group: { _id: '$customer', total: { $sum: '$total' } } }
    //   ])
    //   .toArray();

    // // Find how much has been spent on each product and sort it by price
    // const testArr = await resource
    //   .aggregate([
    //     { $match: {} },
    //     { $group: { _id: '$product', total: { $sum: '$total' } } },
    //     { $sort: { total: -1 } },
    //   ])
    //   .toArray();

    // // Look only for Karen and Mike
    // const testArr = await resource
    //   .aggregate([
    //     { $match: { customer: { $in: ['Mike', 'Karen'] } } },
    //     { $group: { _id: '$customer', total: { $sum: '$total' } } },
    //     { $sort: { total: -1 } },
    //   ])
    //   .toArray();

    // // Find how much money each customer has spent on toothbrushes and pizza
    // const testArr = await resource
    //   .aggregate([
    //     { $match: { product: { $in: ['toothbrush', 'pizza'] } } },
    //     { $group: { _id: '$product', total: { $sum: '$total' } } },
    //   ])
    //   .toArray();
    console.log(testArr);
    res.json(testArr);
  } catch (error) {
    console.error('error in get products', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// POST
testRouter.post('/test', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    // const newPostObj = req.body;
    const newPostObjs = [
      { product: 'toothbrush', total: 4.75, customer: 'Mike' },
      { product: 'guitar', total: 199.99, customer: 'Tom' },
      { product: 'milk', total: 11.33, customer: 'Mike' },
      { product: 'pizza', total: 8.5, customer: 'Karen' },
      { product: 'toothbrush', total: 4.75, customer: 'Karen' },
      { product: 'pizza', total: 4.75, customer: 'Dave' },
      { product: 'toothbrush', total: 4.75, customer: 'Mike' },
    ];
    const resource = dbClient.db(dbName).collection(collName);
    const insertResult = await resource.insertMany(newPostObjs);
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

module.exports = testRouter;
