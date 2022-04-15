const express = require('express');
const { dbClient } = require('../config');

const usersRouter = express.Router();
const dbName = 'caIntroDB';
const collName = 'users';

// Routes
usersRouter.get('/users', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    // get all users in json format []
    const resource = dbClient.db(dbName).collection(collName);
    const usersArr = await resource.find().toArray();
    console.log(usersArr);
    res.json(usersArr);
  } catch (error) {
    console.error('error in get users', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// GET /sort-age/ASC
usersRouter.get('/users/sort-age/:sortOrder', async (req, res) => {
  try {
    const { sortOrder } = req.params;
    let order = 1;
    order = sortOrder === 'DESC' ? -1 : 1;
    const options = {
      sort: { age: order },
    };
    await dbClient.connect();
    console.log('connection opened');
    // get all users in json format []
    const resource = dbClient.db(dbName).collection(collName);
    const usersArr = await resource.find({}, options).toArray();
    console.log(usersArr);
    res.json(usersArr);
  } catch (error) {
    console.error('error in get users', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

module.exports = usersRouter;
