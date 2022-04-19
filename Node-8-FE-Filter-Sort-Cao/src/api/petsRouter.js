const express = require('express');
const { dbClient } = require('../config');

const petsRouter = express.Router();
const dbName = 'caDB';
const collName = 'pets';

// Routes ------------
// GET
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

// GET sort /asc /desc
petsRouter.get('/pets/sort-age/:sortOrder', async (req, res) => {
  try {
    const sortOrder = req.params.sortOrder.toLowerCase();
    const order = sortOrder === 'asc' ? 1 : -1;
    const options = {
      sort: { age: order },
    };
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const sortByAgeArr = await resource.find({}, options).toArray();
    // console.log(sortByAgeArr);
    res.json(sortByAgeArr);
  } catch (error) {
    console.error('error in get pets', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// // GET by type
// petsRouter.get('/pets/:type', async (req, res) => {
//   try {
//     await dbClient.connect();
//     const { type } = req.params;
//     const query = { type };
//     console.log('connection opened');
//     const resource = dbClient.db(dbName).collection(collName);
//     const petsByTypeArr = await resource.find(query).toArray();
//     console.log(petsByTypeArr);
//     res.json(petsByTypeArr);
//   } catch (error) {
//     console.error('error in get pets', error);
//     res.status(500).json('something went wrong');
//   } finally {
//     await dbClient.close();
//     console.log('connection closed');
//   }
// });

// GET by types
petsRouter.get('/pets/:types', async (req, res) => {
  try {
    await dbClient.connect();
    const typesArr = req.params.types.split(',');
    console.log('typesArr ===', typesArr);
    const query = { type: { $in: typesArr } }; // {type: {$in: ["cat", "bird"]} }
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const petsByTypeArr = await resource.find(query).toArray();
    console.log(petsByTypeArr);
    res.json(petsByTypeArr);
  } catch (error) {
    console.error('error in get pets', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// POST
petsRouter.post('/pets', async (req, res) => {
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

// ----------
module.exports = {
  petsRouter,
};
