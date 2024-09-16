const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db/conn');

// Register new user
router.post('/register', (req, res) => {
  const { name, password, phone, email } = req.body;
  
  if (!name || !password || !phone || !email) {
    return res.status(400).send('All fields are required');
  }
  
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO `User` (`Name`, `Email`, `Password`, `Username`, `Phone`) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [name, email, hashedPassword, name, phone], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }

    res.status(201).send('User registered');
  });
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  
  const sql = 'SELECT * FROM User WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.Password);

    if (!passwordIsValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
    console.log("Login successful");
  });
});

module.exports = router;
