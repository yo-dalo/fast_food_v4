const express = require("express");
const db = require("../db/conn");
const pool = require("../db/pool");
const { sendEmail } = require('../Utility/Send_email');

 const router = express.Router();
 
 //INSERT INTO `Order` (`Id`, `UserId`, `ProductId`, `SizeId`, `Time`, `Status`) VALUES (NULL, '1', '2', '3', current_timestamp(), '0');
 
router.get("/api/order/",(req,res)=>{
  const sql =  "SELECT * FROM `Order`";
  db.query(sql,(err,result)=>{
    if(err) throw err
    res.send(result);
  })
  
})
router.get("/api/order/:id",(req,res)=>{
  const {id} =req.params;
  const sql =  "SELECT * FROM `Order` WHERE Id = ?";
  db.query(sql,[id],(err,result)=>{
    if(err) throw err
    res.send(result);
  })
  
})
 
 
 router.post("/api/order/",(req,res)=>{
   const {UserId,ProductId,SizeId,Status} = req.body
   const sql = "INSERT INTO `Order` (`UserId`, `ProductId`, `SizeId`, `Status`) VALUES ( ?, ?, ?, ?);"
 /* 
  json
  {
    "UserId": "1",
    "ProductId":"1",
    "SizeId":"1",
    "Status":"0"
  }
  
  */
  db.query(sql,[UserId,ProductId,SizeId,Status],(err,result)=>{
    if(err) throw err
    res.send({msg:1});
  })
  
})

 router.put("/api/order/:id",(req,res)=>{
   const {id } = req.params;
   const {UserId,ProductId,SizeId,Status} = req.body
  const sql = "UPDATE `Order` SET `UserId`= ? ,`ProductId`= ?,`SizeId`= ? ,`Status`= ?  WHERE Id = ?";
   //const sql = "INSERT INTO `Order` (`UserId`, `ProductId`, `SizeId`, `Status`) VALUES ( ?, ?, ?, ?);"
 /* 
  json
  {
    "UserId": "1",
    "ProductId":"1",
    "SizeId":"1",
    "Status":"0"
  }
  
  */
  db.query(sql,[UserId,ProductId,SizeId,Status,id],(err,result)=>{
    if(err) throw err
    res.send({msg:1});
  })
  
})
 
 
 
 
 router.post("/api/v1/order" ,async(req,res)=>{
   //var cardArr=JSON.parse(req.body.card_arr);
   console.log(req.body);
   
  const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert Product
        const [productResult] = await connection.execute(
          //   `INSERT INTO Order (Time, Status, User_id, Address, Payment_mathed, Payment_id, Payment_time, Paymented, Delivered, Delivered_time) VALUES (current_timestamp(), 1, 1, ? ,  ?, ?, ?, ?, ?, ?)`
            " INSERT INTO `Order` (`Id`, `Time`, `Status`, `User_id`, `Address`, `Payment_mathed`, `Payment_id`, `Payment_time`, `Paymented`, `Delivered`, `Delivered_time`) VALUES (NULL, current_timestamp(), '1', '1', 'jhool', 'case on ', '22\"\"55 ', 'Cgxxv x d xx', '1', '1', 'Gxgd')"
          ,
            [
                req.body.Address,
                req.body.Payment_mathed,
                req.body.Payment_id,
                req.body.Payment_time,
                req.body.Paymented,
                req.body.Delivered,
                req.body.Delivered_time,
                
            ]
        );
        const orderId = productResult.insertId;
        
       for (const card of req.body.card_arr){
          await connection.execute(
                `INSERT INTO Oder_card ( Card_id, Time, Order_id) VALUES (?, current_timestamp(), ?);`,
                [card, orderId,]
            );
        }

       // await connection.commit();
        ///res.status(200).json({ message: 'Product added successfully' });
        
        
        const emailOptions = {
            receiverEmail: "kumaradarsh00572@gmail.com", // Assuming the user's email is passed in the request body
            subject: "Order Confirmation",
            message: `Your order with ID ${orderId} has been successfully placed. Thank you for shopping with us!`
        };


        
        try {
        await  fetch('http://localhost:3000/api/send-email/', {
  Method: 'POST',
  Headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json'
  },
  Body: emailOptions,
  Cache: 'default'
})
console.log("email")
            res.status(200).json({ message: 'Order added successfully and email sent!' });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(200).json({ message: 'Order added successfully but failed to send email.' });
        }

    } catch (error) {
        console.log("not add",error)
        await connection.rollback();
        res.status(500).json({ error: 'An error occurred while adding the product' });
    } finally {
        connection.release();
    }
  




})


router.post("/api/v2/order", async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert Order
        const [productResult] = await connection.execute(
            "INSERT INTO `Order` (`Id`, `Time`, `Status`, `User_id`, `Address`, `Payment_mathed`, `Payment_id`, `Payment_time`, `Paymented`, `Delivered`, `Delivered_time`) VALUES (NULL, current_timestamp(), ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                req.body.Status || '1',
                req.body.User_id || '1',
                req.body.Address || 'Default Address',
                req.body.Payment_mathed || 'cash on delivery',
                req.body.Payment_id || 'Default Payment ID',
                req.body.Payment_time || 'Default Payment Time',
                req.body.Paymented || '1',
                req.body.Delivered || '1',
                req.body.Delivered_time || 'Default Delivered Time'
            ]
        );
        const orderId = productResult.insertId;

        // Insert into Oder_card table
        for (const card of req.body.card_arr) {
            await connection.execute(
                "INSERT INTO Oder_card (Card_id, Time, Order_id) VALUES (?, current_timestamp(), ?);",
                [card, orderId]
            );
        }

        // Commit the transaction before sending the email
        await connection.commit();

        // Send an email to the user
        const emailOptions = {
            receiverEmail: req.body.email || "kumaradarsh00572@gmail.com", // Use dynamic email from request body
            subject: "Order Confirmation",
            message: `Your order with ID ${orderId} has been successfully placed. Thank you for shopping with us!`
        };

        try {
            await sendEmail({ body: emailOptions }, res);
            res.status(200).json({ message: 'Order added successfully and email sent!' });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(200).json({ message: 'Order added successfully but failed to send email.' });
        }

    } catch (error) {
        console.log("Failed to add order:", error);
        await connection.rollback();
        res.status(500).json({ error: 'An error occurred while adding the order' });
    } finally {
        connection.release();
    }
});


 
router.delete("/api/Order/:id",(req,res)=>{
  const {id} = req.params;
  console.log(id)
  const sql= "DELETE FROM `Order` WHERE Id = ?;"
  db.query(sql,[Number(id)],(err,result)=>{
    if(err) throw err;
    res.send({msg:1});
  })
  
})






 
 
 
 
 
 
 
 
 
 module.exports= router;