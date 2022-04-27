require('dotenv').config();

const PORT = process.env.PORT || 5000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ca',
};

module.exports = {
  PORT,
  dbConfig,
};
