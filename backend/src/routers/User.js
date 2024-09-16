const express = require("express");
const  db = require("../db/conn")


const router = express.Router()

router.get("/api/user/",(req,res)=>{
  db.query("SELECT * FROM User",(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
  
})
router.get("/api/user/:id",(req,res)=>{
  const {id}= req.params;
  db.query("SELECT * FROM User WHERE Id = ?",[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
  
})

router.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  const sql = 'DELETE FROM User WHERE Id = ?';
 // DELETE FROM `User` WHERE Id = 85
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category deleted', id });
  });
});

router.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
      const { name,phone,email,username,address} = req.body;
const sql = "UPDATE `User` SET `Name` = ?, `Email` = ?, `Username` = ?, `Phone` = ? ,`Address`= ?  WHERE `User`.`Id` = ?";
  //const sql = 'UPDATE User SET Name = ?, Email = ?,  Phone = ? Username = ? WHERE Id = ?';
  db.query(sql, [name, email, username,phone,address,id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category updated', id });
  });
});

///updated address

router.patch('/api/user/', (req, res) => {
      const {user_id,address} = req.body;
      console.log(req.body)
const sql = "UPDATE `User` SET `Address` = ? WHERE `User`.`Id` = ?;"
    db.query(sql,[address,user_id],(err,result)=>{
      if (err) throw err
      res.send({msg:1})
      
    })  
      
      
      
});
///get addrass
router.get("/api/user/addrass/:id",(req,res)=>{
  const {id}= req.params;
  db.query("SELECT Address FROM User WHERE Id = ?",[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
  
})





module.exports = router;