const { createTableDB, insertCatDB } = require('../models/catModel');

// controller fn
async function createTable(req, res) {
  console.log('createTable controller ran');
  try {
    const createResult = await createTableDB();
    res.json(createResult);
  } catch (error) {
    console.log('error createTable ===', error);
    console.log('error createTable ===', error.sqlMessage); // not for user!!
    // // error.sqlMessage
    // if (error.errno === 64654) {
    // }
    res.sendStatus(500);
  }
  //   if (createResult === false) {
  //     res.status(500).json('Unable to create new table'); // 500 Internal Server Error
  //     return;
  //   }
}

// controller fn
async function createCat(req, res) {
  console.log('createCat controller ran');
  try {
    const { title } = req.body;
    const insertResult = await insertCatDB(title);
    res.json(insertResult);
  } catch (error) {
    console.log('error insertTable ===', error);
    console.log('error insertTable ===', error.sqlMessage); // not for user!!
    // // error.sqlMessage
    // if (error.errno === 64654) {
    // }
    res.sendStatus(500);
  }
  //   if (insertResult === false) {
  //     res.status(500).json('Unable to insert new table'); // 500 Internal Server Error
  //     return;
  //   }
}

module.exports = {
  createTable,
  createCat,
};
