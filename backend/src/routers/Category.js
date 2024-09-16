const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../db/pool'); // Adjust the path to your db connection module

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint to add a category
router.post('/categories', upload.single('file'), async (req, res) => {
  const { categoryName } = req.body;
  const file = req.file;

  if (!categoryName || !file) {
    return res.status(400).json({ error: 'Category name and file are required' });
  }

  try {
    const [rows] = await pool.query('INSERT INTO Category (Name, Img,Status) VALUES (?, ?,?)', [
      categoryName,
      file.filename,
      1,
    ]);

    res.status(201).json({ message: 'Category added successfully', categoryId: rows.insertId });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from the uploads directory
router.use('/uploads', express.static('uploads'));

module.exports = router;
