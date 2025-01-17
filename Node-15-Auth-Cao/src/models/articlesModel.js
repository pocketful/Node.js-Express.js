const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArticlesDb() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM articles';
    const [articles] = await conn.execute(sql, []);
    return articles;
  } catch (err) {
    console.log('error in articles model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getArticlesDb,
};
