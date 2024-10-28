//INSERT INTO `Poster` (`Id`, `Name`, `Img`, `Date`, `Url`) VALUES (NULL, 'Name', '.pnh', current_timestamp(), 'Ww.hw.com');


const express = require('express');
const db = require('../db/conn'); // Adjust the path to your db connection module
const multer = require('multer');
const path = require('path');
const pool = require('../db/pool');
const Get_All_V1_F_Poster = require('../Controller/Poster/Get_All_V1_F');
const {
  checkCookieAuth_Admin
} = require("../Utility/Auth_midd")

const router = express.Router();


router.use("/api/Get/All/V1/F", Get_All_V1_F_Poster)


router.get('/api/poster', (req, res) => {
  const sql = 'SELECT * FROM Poster';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);

  });
});



router.get('/api/v1/ad/poster', (req, res) => {
  const sql = 'SELECT * FROM Poster ORDER BY `Poster`.`Id` DESC';
  db.query(sql,
    (err, result) => {
      if (err) throw err;
      res.send(result);

    });
});
router.get('/api/v2/admin/poster', checkCookieAuth_Admin,(req, res) => {
  const sql = 'SELECT * FROM Poster ORDER BY `Poster`.`Id` DESC';
  db.query(sql,
    (err, result) => {
      if (err) throw err;
      res.send(result);

    });
});
//add pageintion
router.get('/api/v3/admin/poster',(req, res) => {
//add pageintion
const page = parseInt(req.query.page) || 1;  // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of records per page
  const offset = (page - 1) * limit; // Calculate offset for MySQL



  const sql = 'SELECT * FROM Poster ORDER BY `Poster`.`Id` DESC LIMIT ?, ?';
  db.query(sql,[offset,limit],(err, result) => {
      if (err) throw err;
  
    db.query(`SELECT COUNT(*) AS total FROM Poster`, (err, totalResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const totalItems = totalResults[0].total;
      const totalPages = Math.ceil(totalItems / limit);

      res.json({
        data: result,
        currentPage: page,
        totalPages,
        totalItems,
      });
    });
    
    
    });
    
});




router.get('/api/poster/:id', (req, res) => {
  const {
    id
  } = req.params;
  const sql = 'SELECT * FROM Poster WHERE Id = ?';

  db.query(sql,
    [id],
    (err, result) => {
      if (err) {
        console.error('Error fetching category:', err);
        return res.status(500).send('Server error');
      }

      if (result.length === 0) {
        return res.status(404).send('Category not found');
      }

      res.send(result); // Send the first (and likely only) result
    });
});
router.delete('/api/poster/:id', (req, res) => {
  const {
    id
  } = req.params;
  const sql = 'DELETE FROM Poster WHERE Id = ?';
  db.query(sql,
    [id],
    (err, result) => {
      if (err) throw err;
      res.send({
        message: 'Category deleted', id
      });
    });
});
router.delete('/api/v1/admin/poster/:id', checkCookieAuth_Admin,(req, res) => {
  const {
    id
  } = req.params;
  const sql = 'DELETE FROM Poster WHERE Id = ?';
  db.query(sql,
    [id],
    (err, result) => {
      if (err) throw err;
      res.send({
        message: 'Category deleted', id
      });
    });
});


//status
router.patch('/api/poster/:id', (req, res) => {
  const {
    id
  } = req.params;
  const {
    status
  } = req.body;
  const sql = 'UPDATE Poster SET Status = ? WHERE Id = ?';
  db.query(sql,
    [status,
      id],
    (err, result) => {
      if (err) throw err;
      res.send({
        message: 'Category status updated', id, status
      });
    });
});
router.patch('/api/v1/admin/poster/:id',checkCookieAuth_Admin, (req, res) => {
  const {
    id
  } = req.params;
  const {
    status
  } = req.body;
  const sql = 'UPDATE Poster SET Status = ? WHERE Id = ?';
  db.query(sql,
    [status,
      id],
    (err, result) => {
      if (err) throw err;
      res.send({
        message: 'Category status updated', id, status
      });
    });
});


// Edit a categories
router.put('/api/v2/poster/:id', (req, res) => {
  const categoryId = req.params.id;
  const {
    Name, Img, url
  } = req.body;
  console.log(req.body)

  const sql = `UPDATE Poster SET Name = ?, Img = ?, Url =?  WHERE Id = ?`;
  const values = [Name, Img, url, categoryId];

  db.query(sql,
    values,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the category.');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Category not found.');
      } else {
        res.send('Category updated successfully.');
      }
    });
});





const storage = multer.diskStorage({
  destination: (req,
    file,
    cb) => {
    cb(null,
      'uploads/');
  },
  filename: (req,
    file,
    cb) => {
    cb(null,
      Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage
});

router.put('/api/v2/poster/:id', (req, res) => {
  const categoryId = req.params.id;
  const {
    Name, Img, url
  } = req.body;
  console.log(req.body)

  const sql = `UPDATE Poster SET Name = ?, Img = ?, Url =?  WHERE Id = ?`;
  const values = [Name, Img, url, categoryId];

  db.query(sql,
    values,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the category.');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Category not found.');
      } else {
        res.send('Category updated successfully.');
      }
    });
});

// Endpoint to add a category
router.post('/api/poster', upload.single('file'), async (req, res) => {
  const {
    name, url
  } = req.body;
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({
      error: 'Category name and file are required'
    });
  }

  try {
    const [rows] = await pool.query('INSERT INTO Poster (Name, Img,Status,Url) VALUES (?, ?,?,?)', [
      name,
      file.filename,
      1,
      url
    ]);

    res.status(201).json({
      message: 'Category added successfully', categoryId: rows.insertId
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});





// Serve static files from the uploads directory
router.use('/uploads', express.static('uploads'));



module.exports = router;