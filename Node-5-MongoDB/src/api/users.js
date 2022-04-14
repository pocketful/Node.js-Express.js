const express = require('express');
// const { malesIndex } = require('../controller/usersController');
const { findMalesDb, findDb } = require('../../model/usersModel');
const { dbClient } = require('../config');

const usersRouter = express.Router();
const dbName = 'caIntroDB';
const collName = 'users';

// get
usersRouter.get('/users', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const usersArr = await resource.find().toArray();
    console.log(usersArr);
    res.json(usersArr);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// post
usersRouter.post('/users', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const newUser = {
      email: 'test3@test.com',
      gender: 'female',
      hasCar: true,
    };
    const resource = dbClient.db(dbName).collection(collName);
    const insertResult = await resource.insertOne(newUser);
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

// GET /api/users/hascar - atrenkam tik kas turi masina
// eslint-disable-next-line no-use-before-define
usersRouter.get('/users/hascar', hascarController);
async function hascarController(req, res) {
  try {
    await dbClient.connect();
    const query = { hasCar: true };
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const hasCarArr = await resource.find(query).toArray();
    console.log(hasCarArr);
    res.json(hasCarArr);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}
// usersRouter.get('/users/males', malesIndex) - kai su controller
// GET /api/users/males - atrenkam tik vyrus
usersRouter.get('/users/males', async (req, res) => {
  console.log('usersRouter.get(/users/males) ran');
  const malesArr = await findMalesDb();
  if (malesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(malesArr);
  // try {
  //   await dbClient.connect();
  //   const query = { gender: 'male' };
  //   console.log('connection opened');
  //   // const resource = dbClient.db(dbName).collection(collName).find().toArray();
  //   const resource = dbClient.db(dbName).collection(collName);
  //   const malesArr = await resource.find(query).toArray();
  //   console.log(malesArr);
  //   res.json(malesArr);
  // } catch (error) {
  //   console.log(error.message);
  //   res.status(500).json('something went wrong');
  // } finally {
  //   await dbClient.close();
  //   console.log('connection closed');
  // }
});

// GET /api/users/females - atrenkam tik moteris
usersRouter.get('/users/females', async (req, res) => {
  console.log('usersRouter.get(/users/females) ran');
  const femalesArr = await findDb({ gender: 'female' });
  if (femalesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(femalesArr);
});

module.exports = usersRouter;
