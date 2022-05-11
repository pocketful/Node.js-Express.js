const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addUserToDb(email, password) {
  console.log('addUserToDb model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [result] = await conn.execute(sql, [email, password]);
    // console.log("when error this won't run");
    return result;
  } catch (error) {
    console.log('error addUserToDb', error);
    return false;
    // throw error;
  } finally {
    conn?.end();
  }
}

module.exports = {
  addUserToDb,
};
