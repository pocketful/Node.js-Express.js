const express = require('express');
const { dbClient } = require('../config');
const { getArrayDb } = require('../helper');

const usersRouter = express.Router();
const dbName = 'memberships';
const collName = 'users';

// Routes
// GET
usersRouter.get('/users', async (req, res) => {
  try {
    const servicesArr = await getArrayDb('users');
    res.json(servicesArr);
  } catch (error) {
    res.status(500).json('something went wrong');
  }
});

// POST
usersRouter.post('/users', async (req, res) => {
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

module.exports = usersRouter;
