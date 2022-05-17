const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function findUserByEmailDB(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [result] = await conn.execute(sql, [email]);
    // const [result] = await conn.execute(`SELECT * FROM users WHERE email = ${mysql.escape(email)}`);
    return result[0];
  } catch (err) {
    console.log('error in login model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = findUserByEmailDB;
