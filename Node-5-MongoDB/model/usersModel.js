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

// galima daryti findDb, bet vis tiek pacia paieska palikti findFemalesDb(), findMalesDb()
async function findDb(queryValue) {
  console.log('findDb ran');
  try {
    await dbClient.connect();
    const query = queryValue;
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

module.exports = {
  findMalesDb,
  findFemalesDb,
  findDb,
};
