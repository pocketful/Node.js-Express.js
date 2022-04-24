const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');
const { getArrayDb } = require('../helper');

const servicesRouter = express.Router();
const dbName = 'memberships';
const collName = 'services';

// Routes
// GET
servicesRouter.get('/servicesHelper', async (req, res) => {
  try {
    const servicesArr = await getArrayDb('services');
    res.json(servicesArr);
  } catch (error) {
    res.status(500).json('something went wrong');
  }
});

// without helper
servicesRouter.get('/services', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const arrFromDb = await resource.find().toArray();
    // console.log(arrFromDb);
    res.json(arrFromDb);
    // res.json('all services route');
  } catch (error) {
    console.error('error in get arrFromDb', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// POST
servicesRouter.post('/services', async (req, res) => {
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

// DELETE
servicesRouter.delete('/services/:id', async (req, res) => {
  try {
    // const stringId = req.params.id;
    // const mongoObjId = new ObjectId(stringId);
    // await dbClient.connect();
    // const resource = dbClient.db(dbName).collection(collName);
    // const deleteResult = await resource.deleteOne({ _id: mongoObjId });
    const { id } = req.params;
    const query = { _id: ObjectId(id) };
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const deleteResult = await resource.deleteOne(query);
    console.log('deleteResult ===', deleteResult);
    // if (deleteResult.deletedCount === 1) {
    //   console.log('del 1');
    //   res.status(200).res.json({ success: true }); // res.status(200) auto
    //   return;
    // }
    // if (deleteResult.deletedCount === 0) {
    //   console.log('del 0');
    //   res.status(400).json({ err: 'nothing was deleted' });
    //   return;
    // }
    // res.status(500).json('something went wrong');
    res.json(deleteResult);
  } catch (error) {
    console.log('del catch');
    console.error('error in delete a service', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

module.exports = servicesRouter;
