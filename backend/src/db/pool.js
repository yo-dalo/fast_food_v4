const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({path:"./src/.env"});

const pool = mysql.createPool({
  /*
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
 password: process.env.DB_PASSWORD,
   user: process.env.DB_USER,
 */
 
 host: 'bdtuxotsvsxcuimyajys-mysql.services.clever-cloud.com',
  user: 'ugir3lahbjoc6glk',
  password: 'BLBxD3iuRoYfqA0LVbJx',
  database: 'bdtuxotsvsxcuimyajys',
  port: 3306
 
 
});

module.exports = pool;
