//INSERT INTO `Favorites` (`id`, `Product_id`, `User`, `Time`) VALUES (NULL, '2', '1', current_timestamp());
const express = require("express");
const db = require("../db/conn");
const {checkCookieAuth} = require("../Utility/Auth_midd")

 const router = express.Router();
 
 //get Favorites from frantend
 //SELECT f.id ,f.User_id,f.Time FROM Favorites f LEFT JOIN Product p ON p.Id = f.Product_id WHERE f.User_id = 1 and Status = 1;
 
 
 
router.get("/api/favorites/",checkCookieAuth,(req,res)=>{
  var sql = "SELECT * FROM Favorites  WHERE User_id = ?"
  const user_id= req.user.id;
  
  db.query(sql,[user_id],(err,result)=>{
    if(err) throw err
    res.send(result);
  })
  
})
router.get("/api/v1/f/favorites/",checkCookieAuth,(req,res)=>{
  const user_id= req.user.id;
  var sql = "SELECT f.id ,f.User_id,f.Time,  f.Product_id FROM Favorites f LEFT JOIN Product p ON p.Id = f.Product_id WHERE f.User_id = ? and Status = ? ORDER BY `f`.`Time` DESC;"
  db.query(sql,[user_id,1],(err,result)=>{
    if(err) throw err
    res.send(result);
  })
  
})


router.get("/api/favorites/:id",checkCookieAuth,(req,res)=>{
  const {id} = req.params;
  const user_id= req.user.id;
  var sql = "SELECT * FROM `Favorites` WHERE Product_id = ? and User_id = ?";
  db.query(sql,[id,user_id],(err,result)=>{
    if(err) throw err
    if(result.length === 0) res.send({msg:0})
    else {res.send({msg:1})}
   // res.send(result);
  })
  
})
 router.post("/api/favorites/",checkCookieAuth,(req,res)=>{
   const {prodct_id} = req.body;
   const user_id= req.user.id;
   console.log(user_id)
  var  sql= "INSERT INTO `Favorites` (`id`, `Product_id`, `User_id`, `Time`) VALUES (NULL, '?', '?', current_timestamp());";

  db.query(sql,[prodct_id,user_id],(err,result)=>{
    if(err) {
      console.log("sqli err is ",err)
      res.send({msg:0})
    }else{
      res.send({msg:1})
    }
    
    
  })
  
})
 router.delete("/api/favorites/:id",checkCookieAuth,(req,res)=>{
   const {id} = req.params;
   const user_id= req.user.id;
   //const sql ="DELETE FROM Favorites WHERE User_id = ? and Product_id =?";
  // const sql = "DELETE FROM `Favorites` WHERE `Favorites`.`User_id` = ?  AND Product_id= ?";
  const sql = "DELETE FROM `Favorites` WHERE `Favorites`.`Product_id` = ? and User_id = ?";
   db.query(sql,[id,user_id],(err,result)=>{
     if(err) throw err
     res.send({msg:1})
     console.log(sql,1,id)
   })
   
   
 })
 
 //for frantend
 
 
 
 
 
 
 module.exports= router;