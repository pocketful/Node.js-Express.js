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

// shirtsRouter.get('/shirts/:size?', async (req, res) => {
//   try {
//     const conn = await mysql.createConnection(dbConfig);
//     console.log('connection opened');
//     const { size } = req.params;
//     // const sql = size ? 'SELECT * FROM shirts WHERE size = ? ORDER BY price LIMIT 10' : 'SELECT * FROM shirts ORDER BY price LIMIT 10';
//     const sql = `SELECT * FROM shirts ${size ? 'WHERE size = ?' : ''} ORDER BY price LIMIT 10`;
//     const [rows] = size ? await conn.execute(sql, [size]) : await conn.query(sql);
//     await conn.end();
//     console.log('connection ended');
//     res.json(rows);
//   } catch (error) {
//     console.error('error in getting shirts from DB', error);
//     res.status(500).json('something went wrong');
//   }
// });

/*
* GET "/shirts" - išmeta 10 pigiausių marškinių (naudojam MySQL LIMIT ir ORDER BY).
* Pakoreguojame GET "/shirts", kad leistų pagal dydį filtruoti ("/shirts/:size") ir grąžintų 10 pigiausių to dydžio'o. Tačiau jei dydis neparašytas - grąžintų, kaip ir anksčiau, visų dydžių 10 pigiausių.
* Pakoreguokime, kad LIMIT skaičius būtų pagal search parametrą, tarp 1 ir 10(original tarp 10 ir 100). Linko pvz.: "/shirts/M?limit=20" (naudojame req.query).
*/
shirtsRouter.get('/shirts/:size?', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    console.log('req.query ===', req.query); // req.query === { limit: '5' }
    console.log('req.params ===', req.params); // req.params === { size: 'm' }
    console.log('req.params.size ===', req.params.size); // req.params.size === m
    console.log('req.params ===', req.query.limit); // req.params === 5
    const { size } = req.params;
    const { limit } = req.query;
    // const sql = `SELECT * FROM shirts ${size ? 'WHERE size = ?' : ''} ORDER BY price LIMIT ${limit || 10}`; // ${limit ? limit : 10}`;
    const sql = `SELECT * FROM shirts ${size ? 'WHERE size = ?' : ''} ORDER BY price LIMIT ${(limit > 1 && limit < 10) ? limit : 10}`;
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
