const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function findUserByEmailDB(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [result] = await conn.execute(sql, [email]);
    // const [result] = await conn.execute(`SELECT * FROM users WHERE email = ${mysql.escape(email)}`);
    // console.log("when error this won't run");
    return result[0];
  } catch (error) {
    console.log('error findUserByEmail', error);
    return false;
    // throw error;
  } finally {
    conn?.end();
  }
}

module.exports = findUserByEmailDB;
