const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArticlesDb() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM articles';
    const [articles] = await conn.execute(sql, []);
    return articles;
  } catch (error) {
    console.log('error in model:', error);
    throw error;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getArticlesDb,
};
