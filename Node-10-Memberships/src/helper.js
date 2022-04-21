const { dbClient } = require('./config');

const dbName = 'memberships';

async function getArrayDb(collName) {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const arrFromDb = await resource.find().toArray();
    return arrFromDb;
  } catch (error) {
    console.error('error in getArrDb', error);
    throw new Error('error in getArrayDb');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

module.exports = {
  getArrayDb,
};
