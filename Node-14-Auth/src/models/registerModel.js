const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addUserToDB(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    // const [result] = await conn.execute(`INSERT INTO users (email, password) VALUES (${mysql.escape(email)}, ${mysql.escape(password)})`);));
    // const [result] = await conn.execute(`INSERT INTO users (email, password) VALUES (${mysql.escape(email)}, '${password}')`);
    const [result] = await conn.execute(sql, [email, password]);
    // console.log('result ===', result);
    // console.log("when error this won't run");
    return result;
  } catch (err) {
    console.log('error in register model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = addUserToDB;
