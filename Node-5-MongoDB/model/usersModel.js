const { dbClient } = require('../src/config');

const dbName = 'caIntroDB';
const collName = 'users';

async function findMalesDb() {
  console.log('findMalesDb ran');
  try {
    await dbClient.connect();
    const query = { gender: 'male' };
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const malesArr = await resource.find(query).toArray();
    return malesArr;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

async function findFemalesDb() {
  console.log('findFemalesDb ran');
  try {
    await dbClient.connect();
    const query = { gender: 'female' };
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const femalesArr = await resource.find(query).toArray();
    return femalesArr;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

// galima daryti getArrDb(query), bet vis tiek findFemalesDb(), findMalesDb() grazina getArrDB. Kai query sudetingas. Kai norim irasyt tada postToDb, ar deleteFromDb
async function findDb(query) {
  console.log('findDb ran');
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const arr = await resource.find(query).toArray();
    return arr;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

async function findUserByAge(age) {
  console.log('findUserByEmail ran');
  try {
    await dbClient.connect();
    const query = { age };
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const userByAge = await resource.find(query).toArray();
    return userByAge;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

async function findUserByEmail(email) {
  console.log('findUserByEmail ran');
  try {
    await dbClient.connect();
    const query = { email };
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const userByEmail = await resource.find(query).toArray();
    return userByEmail;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

async function findUsersByEmails(emailsArr) {
  console.log('findUserByEmail ran');
  try {
    await dbClient.connect();
    const query = { email: { $in: emailsArr } };
    // db.users.find({age: {$in: [22, 28]}})
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const usersByEmails = await resource.find(query).toArray();
    return usersByEmails;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

module.exports = {
  findMalesDb,
  findFemalesDb,
  findDb,
  findUserByAge,
  findUserByEmail,
  findUsersByEmails,
};
