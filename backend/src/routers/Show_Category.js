
const express = require('express');
const db = require('../db/conn'); // Adjust the path to your db connection module
const router = express.Router();
const checkCookieAuth = require("../Utility/Auth_midd")


router.get('/api/categories',checkCookieAuth,(req, res) => {
  const sql = 'SELECT * FROM Category';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});
router.get('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Category WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
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
router.get('/api/categories/pcard/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT c.Id As category_id,c.Name , p.Id As product_id FROM Category c Left Join Product p On c.Id = p.Category_Id Where c.Id= ?;';
  
  db.query(sql, [id], (err, result) => {
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

router.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Category WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category deleted', id });
  });
});


//status
router.patch('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE Category SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category status updated', id, status });
  });
});


// Edit a categories
router.put('/api/v2/categories/:id', (req, res) => {
    const categoryId = req.params.id;
    const { Name, Img, Status } = req.body;
    console.log(req.body)

    const sql = `UPDATE Category SET Name = ?, Img = ?, Status = ? WHERE Id = ?`;
    const values = [Name, Img, Status, categoryId];

    db.query(sql, values, (err, result) => {
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



//for frantend

router.get('/api/categories/frantend', (req, res) => {
  const sql = 'SELECT * FROM Category WHERE Status = 1';
       //const sql_ = "SELECT * FROM `Category` WHERE Status= 1"; = "SELECT * FROM `Category` WHERE Status= 1";
  db.query(sql_,(err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});




module.exports = router;