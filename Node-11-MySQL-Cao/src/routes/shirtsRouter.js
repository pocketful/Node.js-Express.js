const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const shirtsRouter = express.Router();

// shirtsRouter.get('/shirts', async (req, res) => {
//   try {
//     const conn = await mysql.createConnection(dbConfig);
//     console.log('connection opened');
//     const sql = 'SELECT * FROM `shirts` ORDER BY price LIMIT 10';
//     const [rows] = await conn.query(sql);
//     await conn.end();
//     console.log('connection ended');
//     res.json(rows);
//   } catch (error) {
//     console.error('error in getting shirts from DB', error);
//     res.status(500).json('something went wrong');
//   }
// });

shirtsRouter.get('/shirts/:size?', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const { size } = req.params;
    const sql = size ? 'SELECT * FROM shirts WHERE size = ? ORDER BY price LIMIT 10' : 'SELECT * FROM shirts ORDER BY price LIMIT 10';
    // const optionalSize = size ? 'WHERE size = ?' : '';
    // const sql = `SELECT * FROM shirts ${optionalSize} ORDER BY price LIMIT 10`;
    const [rows] = size ? await conn.execute(sql, [size]) : await conn.query(sql);
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
