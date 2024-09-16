
const express = require('express');
const db = require('../db/conn'); // Adjust the path to your db connection module
const router = express.Router();

router.get('/api/Size/', (req, res) => {
  const sql = 'SELECT * FROM Size';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});
router.get('/api/Size/:id', (req, res) => {
  const {id } = req.params;
  const sql = 'SELECT * FROM Size WHERE Id =?';
  db.query(sql, [id],(err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});




router.patch('/api/size/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE Size SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category status updated', id, status });
  });
});
router.delete('/api/size/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Size WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 1});
  });
});
//add
router.post("/api/size/",(req,res)=>{
   const {name} = req.body;
  const sql = "INSERT INTO `Size` (`Name`, `Date`) VALUES (?, current_timestamp())";
db.query(sql,[name],(err,result)=>{
  if(err) throw err
  res.send({msg:1})
})
  
})
//UPDATE
router.put("/api/size/:id", (req, res) => {
  const {id}= req.params;
    const { name } = req.body;
    // UPDATE `Size` SET `Name`=[new value], `Date`=current_timestamp() WHERE `Id`=[specified id]
    const sql = "UPDATE `Size` SET `Name` = ?, `Date` = current_timestamp() WHERE `Id` = ?";
    
    db.query(sql, [name, id], (err, result) => {
        if (err) throw err;
        res.send({ msg: "Size updated successfully" });
    });
});



module.exports = router;