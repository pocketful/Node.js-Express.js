const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

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

async function insertCatDB(title) {
  console.log('insertCatDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    // const { title } = req.body; // controller
    const sql = 'INSERT INTO categories (title) VALUES (?)';
    const [result] = await conn.execute(sql, [title]);
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

module.exports = {
  createTableDB,
  insertCatDB,
};
