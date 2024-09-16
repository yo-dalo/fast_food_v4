//INSERT INTO `Favorites` (`id`, `Product_id`, `User`, `Time`) VALUES (NULL, '2', '1', current_timestamp());
const express = require("express");
const db = require("../db/conn");
const checkCookieAuth = require("../Utility/Auth_midd")

 const router = express.Router();
 
 
router.get("/api/favorites/",(req,res)=>{
  var sql = "SELECT * FROM Favorites WHERE User_id = ?"
  db.query(sql,[1],(err,result)=>{
    if(err) throw err
    res.send(result);
  })
  
})
router.get("/api/favorites/:id",(req,res)=>{
  const {id} = req.params;
  var sql = "SELECT * FROM `Favorites` WHERE Product_id = ? and User_id = ?";
  db.query(sql,[id,1],(err,result)=>{
    if(err) throw err
    if(result.length === 0) res.send({msg:0})
    else {res.send({msg:1})}
   // res.send(result);
  })
  
})
 router.post("/api/favorites/",(req,res)=>{
   const {prodct_id} = req.body
   console.log(req.body)
  var  sql= "INSERT INTO `Favorites` (`id`, `Product_id`, `User_id`, `Time`) VALUES (NULL, '?', '?', current_timestamp());";

  db.query(sql,[prodct_id,1],(err,result)=>{
    if(err) {
      console.log("sqli err is ",err)
      res.send({msg:0})
    }else{
      res.send({msg:1})
    }
    
    
  })
  
})
 router.delete("/api/favorites/:id",(req,res)=>{
   const {id} = req.params;
   //const sql ="DELETE FROM Favorites WHERE User_id = ? and Product_id =?";
  // const sql = "DELETE FROM `Favorites` WHERE `Favorites`.`User_id` = ?  AND Product_id= ?";
  const sql = "DELETE FROM `Favorites` WHERE `Favorites`.`Product_id` = ? and User_id = ?";
   db.query(sql,[id,1],(err,result)=>{
     if(err) throw err
     res.send({msg:1})
     console.log(sql,1,id)
   })
   
   
 })
 
 //for frantend
 
 
 
 
 
 
 module.exports= router;