const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addUserToDB(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    // const [result] = await conn.execute(`INSERT INTO users (email, password) VALUES (${mysql.escape(email)}, ${mysql.escape(password)})`);));
    // const [result] = await conn.execute(`INSERT INTO users (email, password) VALUES (${mysql.escape(email)}, '${password}')`);
    const [result] = await conn.execute(sql, [email, password]);
    // console.log('result ===', result);
    // console.log("when error this won't run");
    return result;
  } catch (error) {
    console.log('error addUserToDb model', error);
    // return false;
    throw error;
  } finally {
    conn?.end();
  }
}

module.exports = addUserToDB;
