const express = require('express');
// const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const usersMembershipsRouter = express.Router();
const dbName = 'memberships';
const collName = 'users';

usersMembershipsRouter.get('/usersMemberships/:order?', async (req, res) => {
  try {
    const order = req.params.order?.toLowerCase() === 'asc' ? 1 : -1;
    // const options = {
    //   sort: { name: order },
    // };
    await dbClient.connect();
    console.log('connection opened');
    const agg = [
      {
        $lookup: {
          from: 'services',
          localField: 'service_id',
          foreignField: '_id',
          as: 'servicesArr',
        },
      },
      {
        $sort: {
          name: order,
        },
      },
      // {
      //   $replaceRoot: {
      //     newRoot: {
      //       $mergeObjects: [
      //         {
      //           $arrayElemAt: ['$servicesArr', 0],
      //         },
      //         '$$ROOT',
      //       ],
      //     },
      //   },
      // },
      // {
      //   $project: {
      //     servicesArr: 0,
      //   },
      // },
    ];
    const resource = dbClient.db(dbName).collection(collName);
    // const arrFromDb = await resource.find({}, options).toArray();
    // const arrFromDb = await resource.aggregate(agg).find({}, options).toArray();
    const arrFromDb = await resource.aggregate(agg).toArray();
    // console.log(arrFromDb);
    res.json(arrFromDb);
  } catch (error) {
    console.error('error in get arrFromDb', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// const booksArr = await resource.aggregate(agg).toArray();

module.exports = usersMembershipsRouter;
