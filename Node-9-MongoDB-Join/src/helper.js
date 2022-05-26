const { dbClient } = require('./config');

const dbName = 'library';

async function getArrayDb(collName) {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const resource = dbClient.db(dbName).collection(collName);
    const arrFromDb = await resource.find().toArray();
    // console.log(arrFromDb);
    return arrFromDb; // res.json(arrFromDb);
  } catch (error) {
    console.error('error in getArrDb', error);
    // return false;
    throw new Error('error in getArrayDb'); // you can get it with try catch
    // res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
}

// function getSingleArrayDb(collName, stringId) {}

module.exports = {
  getArrayDb,
//   getSingleArrayDb,
};
