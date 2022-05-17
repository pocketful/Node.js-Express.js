const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function registerUserDb(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [insertResult] = await conn.execute(sql, [email, password]);
    return insertResult;
  } catch (error) {
    console.log('error in register model:', error);
    throw error;
  } finally {
    conn?.end();
  }
}

module.exports = {
  registerUserDb,
};
