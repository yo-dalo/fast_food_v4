
const express = require('express');
const db = require('../db/conn'); // Adjust the path to your db connection module
const router = express.Router();
//get all
router.get('/api/Size_/', (req, res) => {
  const sql = 'SELECT * FROM Size_';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});
//status
router.patch('/api/size_/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE Size_ SET status = ? WHERE Id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category status updated', id, status });
  });
});
///delete
router.delete('/api/size_/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Size_ WHERE Id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 1});
  });
});
//add
router.post("/api/size_/",(req,res)=>{
   const {Size_id,Product_id,Rs} = req.body;
   console.log("size_ add",req.body)
   ///INSERT INTO `Size_`(`Id`, `Size_id`, `Product_id`, `Rs`) VALUES ([value-1],[value-2],[value-3],[value-4])
  const sql = "INSERT INTO `Size_` (`Size_id`, `Product_id`,  `Rs`) VALUES (?, ?,?)";
db.query(sql,[Size_id,Product_id,Rs],(err,result)=>{
  if(err) throw err
  res.send({msg:1})
})
  
})
//UPDATE
router.put("/api/size_/", (req, res) => {
    const { id, size_id, product_id, rs } = req.body;
    
    const sql = "UPDATE `Size_` SET `Size_id` = ?, `Product_id` = ?, `Rs` = ?  WHERE `Id` = ?";
    
    db.query(sql, [size_id, product_id, rs, id], (err, result) => {
        if (err) throw err;
        res.send({ msg: "Size updated successfully" });
    });
});


module.exports = router;