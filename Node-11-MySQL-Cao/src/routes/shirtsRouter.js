const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const shirtsRouter = express.Router();

shirtsRouter.get('/shirts', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `shirts`';
    const [rows] = await conn.query(sql);
    await conn.end();
    console.log('connection ended');
    res.json(rows);
  } catch (error) {
    console.error('error in getting shirts from DB', error);
    res.status(500).json('something went wrong');
  }
});

shirtsRouter.post('/shirts', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const {
      brand, model, size, price,
    } = req.body;
    const sql = 'INSERT INTO shirts (brand, model, size, price) VALUES (?, ?, ?, ?)';
    const [insertResult] = await conn.execute(sql, [brand, model, size, price]);
    await conn.end();
    console.log('connection ended');
    res.json(insertResult);
  } catch (error) {
    console.error('error in getting shirts from DB', error);
    res.status(500).json('something went wrong');
  }
});

module.exports = shirtsRouter;
