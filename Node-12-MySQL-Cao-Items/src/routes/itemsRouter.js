const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const itemsRouter = express.Router();

itemsRouter.get('/items', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM items';
    const [rows] = await conn.query(sql);
    await conn.end();
    res.json(rows);
  } catch (error) {
    console.error('Unable to get items from DB', error);
    res.status(500).json('Something went wrong');
  }
});

module.exports = itemsRouter;
