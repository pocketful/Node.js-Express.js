const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function registerUserDb(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [insertResult] = await conn.execute(sql, [email, password]);
    return insertResult;
  } catch (err) {
    console.log('error in register model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  registerUserDb,
};
