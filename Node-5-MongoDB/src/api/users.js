const express = require('express');
// const { malesIndex } = require('../controller/usersController');
const { findMalesDb, findDb, findUserByEmail, findUsersByEmails, findUserByAge } = require('../../model/usersModel');
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
    // const { email, gender, hasCar, age } = req.body; // destructuring example
    await dbClient.connect();
    console.log('connection opened');
    const newUser = {
      email: 'test3@test.com',
      gender: 'female',
      hasCar: true,
    };
    const resource = dbClient.db(dbName).collection(collName);
    // const insertResult = await resource.insertOne({email, gender, hasCar, age}); // destructuring example
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
    const hascarArr = await resource.find(query).toArray();
    console.log(hascarArr);
    res.json(hascarArr);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}
// usersRouter.get('/users/males', malesIndex) - kai su controller, tai tik sita eilute
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
  const query = { gender: 'female' };
  const femalesArr = await findDb(query);
  if (femalesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(femalesArr);
});

// GET /api/users/age/gt/20 - atrenkam zmones vyresnius nei 20 (20 dinaminis segmentas kuriam galim paduoti koki norim skaiciu)
usersRouter.get('/users/age/gt/:someAge', async (req, res) => {
  console.log('usersRouter.get(/users/age/gt/:someAge) ran');
  const age = +req.params.someAge;
  console.log('age ===', age);
  const userByAge = await findUserByAge(age);
  if (userByAge === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(userByAge);
});

// GET /api/users/email/test6@test.com - atrenkam useri pagal email (dynamic)
usersRouter.get('/users/email/:someEmail', async (req, res) => {
  console.log('usersRouter.get(/users/someEmail/) ran');
  const email = req.params.someEmail;
  console.log('email ===', email);
  const userByEmail = await findUserByEmail(email);
  if (userByEmail === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(userByEmail);
});

// GET /api/users/email/test6@test.com,test3@test.com - atrenkam kelis userius pagal email, surasytus per kableli (dynamic)
usersRouter.get('/users/email/:someEmails', async (req, res) => {
  console.log('usersRouter.get(/users/someEmails/) ran');
  const emailsArr = req.params.someEmails.split(',');
  console.log('emailsArr ===', emailsArr);
  const usersByEmails = await findUsersByEmails(emailsArr);
  if (usersByEmails === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(usersByEmails);
});

module.exports = usersRouter;
