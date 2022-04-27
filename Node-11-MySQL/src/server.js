const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// create the connection to database
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ca',
};

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/api/posts', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connection opened');
    const sql = 'SELECT * FROM `posts`';
    // const result = await connection.query(sql);
    // const [rows, fields] = await connection.query(sql);
    const [rows] = await connection.query(sql);
    console.log('rows ===', rows);
    res.json(rows);
    // res.json(result[0]);
  } catch (error) {
    console.error('route error', error);
    res.status(500).json('something went wrong');
  } finally {
    if (connection) await connection.end();
    // connection?.end();
    // await connection.end();
    console.log('connection ended');
  }
});

// Routes

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
