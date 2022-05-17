require('dotenv').config();

const PORT = process.env.PORT || 5000;
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) throw new Error('No private key in .env');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

module.exports = {
  PORT,
  privateKey,
  dbConfig,
};
