const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({path:"./src/.env"});

const pool = mysql.createPool({
  
  host: process.env.DB_HOST ||  '127.0.0.1',
  database: process.env.DB_NAME||'Fast_food_3',
 password: process.env.DB_PASSWORD || "root",
   user: process.env.DB_USER ||'root',
  port: process.env.DB_PORT
 
 /*
 host: 'bdtuxotsvsxcuimyajys-mysql.services.clever-cloud.com',
  user: 'ugir3lahbjoc6glk',
  password: 'BLBxD3iuRoYfqA0LVbJx',
  database: 'bdtuxotsvsxcuimyajys',
  port: 3306
 
 */
});

module.exports = pool;
