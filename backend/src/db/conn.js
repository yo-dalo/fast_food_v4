const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({path:"./src/.env"});

const db = mysql.createConnection({
  host: process.env.DB_HOST_1 ||  '127.0.0.1',
  database: process.env.DB_NAME_1||'Fast_food_3',
 password: process.env.DB_PASSWORD_2 || "root",
   user: process.env.DB_USER_1 ||'root',
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...'+process.env.DB_USER);
  console.log('MySQL DB_NAME...'+process.env.DB_NAME);
  console.log('MySQL DB_PASSWORD...'+process.env.DB_PASSWORD);
  console.log(typeof process.env.DB_USER);
});

module.exports = db;