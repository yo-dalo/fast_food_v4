const express = require('express');
const router = express.Router();
const db = require('../../db/conn');
router.get('/poster', (req, res) => {
  const sql = 'SELECT * FROM Poster WHERE Status = ?';
  db.query(sql,[1], (err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});





  
  
  
  
  
  
  
  
  
  






module.exports = router;