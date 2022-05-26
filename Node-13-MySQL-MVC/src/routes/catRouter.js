const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const catRouter = express.Router();

// model, catModel
async function createTableDB() {
  console.log('createTableDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = `CREATE TABLE ca.categories (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)) ENGINE = InnoDB`;
    const [result] = await conn.query(sql);
    // console.log("when error this won't run");
    return result;
  } catch (error) {
    // console.log('error createTableDB', error);
    // return false; // 1 level
    // throw new Error('error createTableDB'); // 2 level

    // 3 level:
    console.log('error createTableDB');
    throw error;
    // throw new Error() // allow only strings
    // throw { errorFn: 'error createTableDB', error: error };
  } finally {
    await conn?.end(); // if (conn) await conn.end();
  }
}

// controller, catController
async function createTable(req, res) {
  console.log('createTable controller ran');
  //   // 1 level, without try catch
  //   const createResult = await createTableDB();
  //     if (createResult === false) {
  //       res.sendStatus(400);
  //       return;
  //     }
  //   res.json(createResult);
  //   }

  //   // 2 level
  //   try {
  //     const createResult = await createTableDB();
  //     res.json(createResult);
  //   } catch (error) {
  //     console.log('error createTable ===', error); // 'error createTable === error createTableDB'
  //     res.sendStatus(500);
  //   }

  // 3 level
  try {
    const createResult = await createTableDB();
    res.json(createResult);
  } catch (error) {
    console.log('error createTable ===', error); // '...Error: Unknown column in fields list...'
    console.log('error createTable ===', error.sqlMessage); // 'Unknown column in fields list' not for user!!
    if (error.errno === 1054) {
      console.log('column error');
      res.sendStatus(400);
      return;
    }
    res.sendStatus(500);
  }
}

catRouter.post('/categories/newTable', createTable);

module.exports = catRouter;

/* MVC:
// model, catModel
async function createTableDB() {
  console.log('createTableDB model ran');
}

// controller, catController
async function createTable(req, res) {
  console.log('createTable controller ran');
  const success = createTableDB();
  if (success) res.json('table created');
}

catRouter.post('/categories', createTable);

// createTable controller ran
// createTableDB model ran
// connection opened
// connection ended
*/
