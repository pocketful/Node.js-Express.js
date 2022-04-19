// MongoDB Compass > Aggregations > $lookup > Save (on top) > Export (on top), copy data

/**
 * from: The target collection. /  su kokia lentele jungiam
 * localField: The local join field. // vietinis laukas kuris yra vienodas su kitos lenteles lauku
 * foreignField: The target join field. // kitos lenteles laukas lygus localField'ui
 * as: The name for the results. // pasirenkam patys kazka
 * pipeline: The pipeline to run on the joined collection.
 * let: Optional variables to use in the pipeline field stages.
 */
{
  from: 'authors',
  localField: '_id',
  foreignField: 'bookId',
  as: 'authorArr'
}

/* ----------------------------------------------------------------- */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$lookup': {
      'from': 'authors', 
      'localField': '_id', 
      'foreignField': 'bookId', 
      'as': 'authorArr'
    }
  }
];

MongoClient.connect(
  'mongodb+srv://Iveta:pass123@ca.a62xs.mongodb.net/test',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('library').collection('books');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
});