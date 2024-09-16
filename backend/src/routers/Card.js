///Id	Product_id	User_id	Size_id	Time
const express = require("express");
const db = require("../db/conn");
const checkCookieAuth = require("../Utility/Auth_midd")

 const router = express.Router();
 
router.get("/api/card/",(req,res)=>{
  var sql = "SELECT * FROM Card WHERE User_id = ?"
  db.query(sql,[1],(err,result)=>{
    if(err) throw err
    res.send(result);
    
  })
  
})
router.get("/api/f/v2/card/",(req,res)=>{
 let sql = "SELECT * FROM Card c INNER JOIN Product p ON c.Product_id = p.Id INNER JOIN Product_img pi ON c.Product_id = pi.Product_id INNER JOIN Size_ sz ON c.Product_id = sz.Product_id WHERE c.User_id = ?"
 //let sql = "SELECT * FROM Card c INNER JOIN Product p ON c.Product_id = p.Id INNER JOIN Product_img pi ON c.Product_id = pi.Product_id INNER JOIN Size_ sz ON c.Product_id = sz.Product_id INNER JOIN Size s ON sz.Size_id= s.Id WHERE c.User_id = ? "
 
  db.query(sql,[1],(err,result)=>{
     function convertData_3(card) {
  // Object to keep track of unique items
  const uniqueItems = {};

  card.forEach(item => {
    const key = `${item.Product_id}_${item.Category_id}`;

    if (!uniqueItems[key]) {
      // If the item is unique, create a new entry
      uniqueItems[key] = {
        Id: item.Id,
        Product_id: item.Product_id,
        User_id: item.User_id,
        Size: [{ size_name: `Size_${item.Size_id}`, size_id: item.Size_id, size_price: item.Rs }], // Initial Size array
        Time: item.Time,
        Qty: item.Qty,
        Name: item.Name,
        Date: item.Date,
        Rs: item.Rs,
        Details: item.Details,
        Rating: item.Rating,
        Status: item.Status,
        Category_id: item.Category_id,
        Img: [item.Img] // Initial Img array
      };
    } else {
      // If the item already exists, check for duplicates in Size
      const existingSize = uniqueItems[key].Size.find(size => size.size_id === item.Size_id);
      if (!existingSize) {
        uniqueItems[key].Size.push({ size_name: `Size_${item.Size_id}`, size_id: item.Size_id, size_price: item.Rs });
      }

      // Check for duplicates in Img array
      if (!uniqueItems[key].Img.includes(item.Img)) {
        uniqueItems[key].Img.push(item.Img);
      }
    }
  });

  // Convert the uniqueItems object back to an array
  return Object.values(uniqueItems);
}

  res.json(Object.values(convertData_3(result)));
  
})


})
router.get("/api/f/v3/card/",(req,res)=>{

var sql =`SELECT
    c.Id AS Card_id,
    c.Product_id,
    c.User_id,
    c.Size_id AS Size_id,
    c.Qty,
    p.Name AS Product_name,
    p.Details,
    p.Rating,
    p.Time,
    sz.Rs,
    s.Name AS Size_name,
    s.Name AS Size_name,
    pi.Img
FROM
    Card c
LEFT JOIN Product p ON
    c.Product_id = p.Id
LEFT JOIN Size_ sz ON
    c.Size_id = sz.Id
LEFT JOIN Product_img pi ON
    c.Product_id = pi.Product_id
LEFT JOIN Size s ON
    sz.Size_id = s.Id WHERE c.User_id = ?`


  db.query(sql,[1],(err,result)=>{
     function getcard(c) {
  // Tab to edit

var new_card = {}

c.map(items => {
  var key = `${items.Product_id}_${items.Size_id}`
  if (!new_card[key]) {
    new_card[key] = {
      Id: items.Card_id,
      product_id: items.Product_id,
      user_id: items.User_id,
      Size_id: items.Size_id,
      Qty: items.Qty,
      Product_name: items.Product_name,
      Details: items.Details,
      Img: items.Img,
      Size_name: items.Size_name,
      Rs: items.Rs,
      Rating: items.Rating,

    }




  }



})
return Object.values(new_card);
}


  res.json(Object.values(getcard(result)));
  
})


})
router.get("/api/f/v1/card/",(req,res)=>{
 let sql = "SELECT * FROM Card c INNER JOIN Product p ON c.Product_id = p.Id INNER JOIN Product_img pi ON c.Product_id = pi.Product_id INNER JOIN Size_ sz ON c.Product_id = sz.Product_id WHERE c.User_id = ?"
 //let sql = "SELECT * FROM Card c INNER JOIN Product p ON c.Product_id = p.Id INNER JOIN Product_img pi ON c.Product_id = pi.Product_id INNER JOIN Size_ sz ON c.Product_id = sz.Product_id INNER JOIN Size s ON sz.Size_id= s.Id WHERE c.User_id = ? "
  db.query(sql,[1],(err,result)=>{
     if(err) throw err
  res.send(result);
  
})


})

//get card by maltipal card id 
router.post("/api/f/v4/card/", (req, res) => {
  const { my_card_arr } = req.body;
var pl=my_card_arr.map((i,r)=>{
  var str= `? ,`
  return i;
}).join(",")

const sql = `SELECT
    c.Id As card_id ,
    c.Product_id ,
    c.User_id,
    c.Size_id,
    c.Qty,
    p.Name As product_name,
    p.Rs,
    p.Details,
    p.Rating,
    p.Category_id,
    sz.Rs As price,
    s.Name As size_name
FROM
    Card c
LEFT JOIN Product p ON
    c.Product_id = p.Id
    left join Size_ sz On c.Size_id = sz.Id
    left join Size s On sz.Size_id = s.Id
WHERE
p.Status = 1 AND 
    c.Id IN (${pl})`;

db.query(sql, (err,result)=>{
  
  res.send(result);
  
  
})







});
router.post("/api/f/v5/card/", (req, res) => {
  const { my_card_arr } = req.body;
var pl=my_card_arr.map((i,r)=>{
  var str= `? ,`
  return i;
}).join(",")

const sql = `SELECT
    c.Id As card_id ,
    c.Product_id ,
    c.User_id,
    c.Size_id,
    c.Qty,
    p.Name As product_name,
    p.Rs,
    p.Details,
    p.Rating,
    p.Category_id,
    sz.Rs As price,
    s.Name As size_name,
    pi.Img
FROM
    Card c
LEFT JOIN Product p ON
    c.Product_id = p.Id
    left join Size_ sz On c.Size_id = sz.Id
    left join Size s On sz.Size_id = s.Id
    Left join Product_img pi  On  p.Id = pi.Product_id
WHERE
c.User_id= 1 AND
p.Status = 1 AND 
    c.Id IN (${pl})`;

db.query(sql, (err,result)=>{
  if (err) throw err
  var data ={}
  result.forEach((i,r)=>{
    let key = `${i.card_id} `;
    if(!data[key]){
      data[key]={
        card_id : i.card_id,
        product_id : i.Product_id,
        User_id:i.User_id,
        Size_id :i.Size_id,
        Qty:i.Qty,
        product_name:i.product_name,
        Rs:i.Rs,
        Details:i.Details,
        Rating:i.Rating,
        Category_id:i.Category_id,
        price:i.price,
        size_name:i.size_name,
        Img:i.Img,
        
      }
    }
    
    
    
    
    
    
  });
  
  
  res.send(Object.values(data));
  
  
})







});
router.post("/api/f/v6/card/", (req, res) => {
  const { my_card_arr } = req.body;
var pl=my_card_arr.map((i,r)=>{
  var str= `? ,`
  return i;
}).join(",")

const sql = `SELECT
    c.Id As card_id ,
    c.Product_id ,
    c.User_id,
    c.Size_id,
    c.Qty,
    p.Name As product_name,
    p.Rs,
    p.Details,
    p.Rating,
    p.Category_id,
    sz.Rs As price,
    s.Name As size_name,
    pi.Img,
    u.Address
    
FROM
    Card c
LEFT JOIN Product p ON
    c.Product_id = p.Id
    left join Size_ sz On c.Size_id = sz.Id
    left join Size s On sz.Size_id = s.Id
    Left join Product_img pi  On  p.Id = pi.Product_id
    Left join User u On c.User_id = u.Id
WHERE
c.User_id= 1 AND
p.Status = 1 AND 
    c.Id IN (${pl})`;

db.query(sql, (err,result)=>{
  
  var data ={}
  result.forEach((i,r)=>{
    let key = `${i.card_id} `;
    if(!data[key]){
      data[key]={
        card_id : i.card_id,
        product_id : i.Product_id,
        User_id:i.User_id,
        Size_id :i.Size_id,
        Qty:i.Qty,
        product_name:i.product_name,
        Rs:i.Rs,
        Details:i.Details,
        Rating:i.Rating,
        Category_id:i.Category_id,
        price:i.price,
        size_name:i.size_name,
        Img:i.Img,
        Address:i.Address
      }
    }
    
    
    
    
    
    
  })
  
  
  
  res.send(Object.values(data));
  
  
})







});









router.get("/api/card/:id",(req,res)=>{
  const {id} = req.params;
  var sql = "SELECT * FROM `Card` WHERE Id = ? and User_id = ?";
  db.query(sql,[id,1],(err,result)=>{
    if(err) throw err
    if(result.length === 0) res.send({msg:0})
    else {res.send(result)}
   // res.send(result);
  })
  
})
router.post("/api/card/",(req,res)=>{
   const {product_id,size_id,prodct_qty} = req.body
   
//const sql = "INSERT INTO `Card` ( `Product_id`, `User_id`, `Size_id`, `Time`) VALUES (?, ?, ?, current_timestamp());"
const sql = "INSERT INTO `Card` (`Id`, `Product_id`, `User_id`, `Size_id`, `Time`, `Qty`) VALUES (NULL, '?', '?', '?', current_timestamp(), '?')";
   
  db.query(sql,[product_id,1,size_id,prodct_qty],(err,result)=>{
    if(err) {
      console.log("sqli err is ",err)
      res.send({msg:0})
    }else{
      res.send({msg:1})
    }
    
    
  })
  
})
router.delete("/api/card/:id",(req,res)=>{
   const {id} = req.params;
   //const sql ="DELETE FROM Favorites WHERE User_id = ? and Product_id =?";
  // const sql = "DELETE FROM `Favorites` WHERE `Favorites`.`User_id` = ?  AND Product_id= ?";
  const sql = "DELETE FROM `Card` WHERE Id  = ? and User_id = ?";
   db.query(sql,[id,1],(err,result)=>{
     if(err) throw err
     res.send({msg:1})
     console.log(id)
   })
   
   
 })
 
 ///update qty
router.patch("/api/card/update/qty/",(req,res)=>{
   const {id,qty} = req.body;
   //const sql ="DELETE FROM Favorites WHERE User_id = ? and Product_id =?";
  // const sql = "DELETE FROM `Favorites` WHERE `Favorites`.`User_id` = ?  AND Product_id= ?";
  const sql = "UPDATE `Card` SET `Qty` = ? WHERE `Card`.`Id` = ?;";
   db.query(sql,[qty,id],(err,result)=>{
     if(err) throw err
     res.send({msg:1})
     console.log(id)
   })
   
   
 })
 
 
 
 
 
 
 module.exports= router;