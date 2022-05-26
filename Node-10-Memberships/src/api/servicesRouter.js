const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');
// const { getArrayDb } = require('../helper');

const servicesRouter = express.Router();
const dbName = 'memberships';
const collName = 'services';

// Routes
// GET
// servicesRouter.get('/servicesHelper', async (req, res) => {
//   try {
//     const servicesArr = await getArrayDb('services');
//     res.json(servicesArr);
//   } catch (error) {
//     res.status(500).json('something went wrong');
//   }
// });

// without helper
servicesRouter.get('/services', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    // const agg = [
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: '_id',
    //       foreignField: 'service_id',
    //       as: 'usersArr',
    //     },
    //   },
    // ];
    const resource = dbClient.db(dbName).collection(collName);
    const arrFromDb = await resource.find().toArray();
    // const arrFromDb = await resource.aggregate(agg).toArray();
    // console.log(arrFromDb);
    res.json(arrFromDb);
    // res.json('all services route');
  } catch (error) {
    console.error('error in get arrFromDb', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

// POST
servicesRouter.post('/services', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connection opened');
    const newServiceObj = req.body;
    const resource = dbClient.db(dbName).collection(collName);
    const insertResult = await resource.insertOne(newServiceObj);
    // if (insertResult.insertedId) {
    //   console.log('insertResult ===', insertResult);
    //   // res.status(201);
    //   // when response with status only then use sendStatus
    //   res.sendStatus(201);
    //   return;
    // }
    // throw new Error('something went wrong while trying to add new service');
    // } catch (error) {
    //   console.error('error in add service', error); // error is from throw new Error
    //   console.log('error.message', error.message);
    //   res.status(500).json('something went wrong');
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

// DELETE
servicesRouter.delete('/services/:id', async (req, res) => {
  try {
    // const stringId = req.params.id;
    // const mongoObjId = ObjectId(stringId);
    // const serviceId = { _id: mongoObjId };
    const stringId = req.params.id;
    const mongoObjId = ObjectId(stringId);
    const serviceId = { _id: mongoObjId };
    console.log('serviceId', serviceId);
    await dbClient.connect();
    console.log('connection opened');
    const agg = [
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'service_id',
          as: 'usersArr',
        },
      },
      {
        $match: {
          _id: mongoObjId,
        },
      },
      // {$group: {_id: "$product", total: { $sum: "$total"} } },
    ];
    const resource = dbClient.db(dbName).collection(collName);
    const aggregatedArr = await resource.aggregate(agg).toArray();
    console.log(aggregatedArr);
    // check if servers has users, if it has, then forbid deleting
    if (aggregatedArr[0].usersArr.length !== 0) {
      console.log('Forbid deletion');
      res.json({ err: 'Cannot delete a service with active users' });
      return;
    }
    // [
    //   {
    //     _id: new ObjectId("62658005f054866661d7553b"),
    //     name: 'ra',
    //     price: 56,
    //     description: 'sdasd',
    //     usersArr: [ [Object], [Object] ]
    //   }
    // ]
    // const serviceByIdObj = await resource.findOne(serviceId);
    const deleteResult = await resource.deleteOne(serviceId);
    console.log('deleteResult ===', deleteResult);
    if (deleteResult.deletedCount === 1) {
      res.status(200).json({ success: true }); // res.status(200) auto
      return;
    }
    if (deleteResult.deletedCount === 0) {
      res.status(400).json({ success: false, err: 'nothing was deleted' });
      return;
    }
    throw new Error('error trying delete a service'); // to catch block
  } catch (error) {
    console.error(error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
    console.log('connection closed');
  }
});

module.exports = servicesRouter;
