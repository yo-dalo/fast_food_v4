const express = require("express");
const db = require("../db/conn");
const pool = require("../db/pool");

const {
  sendEmail
} = require('../Utility/Send_email');
const {
  checkCookieAuth_Admin,
  checkCookieAuth
} = require("../Utility/Auth_midd")


const router = express.Router();

//INSERT INTO `Order` (`Id`, `UserId`, `ProductId`, `SizeId`, `Time`, `Status`) VALUES (NULL, '1', '2', '3', current_timestamp(), '0');

router.get("/api/order/", (req, res)=> {
  const sql = "SELECT * FROM `Order`";
  db.query(sql, (err, result)=> {
    if (err) throw err
    res.send(result);
  })

})
router.get("/api/v1/admin/order/", checkCookieAuth_Admin, (req, res)=> {
  const sql = "SELECT * FROM `Order` ORDER BY `Order`.Id DESC";
  db.query(sql,
    (err, result)=> {
      if (err) throw err
      res.send(result);
    })

})


router.get("/api/v1/f/myOder/",checkCookieAuth,(req,res)=>{
  const {id} = req.user;
  console.log("id"+id);

 const  sql =  "SELECT Id,Time,Status,Address,Payment_id FROM `Order` Where User_id = ? ORDER BY `Order`.Id DESC"
  
  db.query(sql,[id],(err,result)=>{
    if (err) throw err
    res.send(result);
    console.log(id);
  })
  
  
  
})






router.get("/api/order/:id", (req, res)=> {
  const {
    id
  } = req.params;
  const sql = "SELECT * FROM `Order` WHERE Id = ?";
  db.query(sql,
    [id],
    (err, result)=> {
      if (err) throw err
      res.send(result);
    })

})

router.get("/api/order_detal/:id",checkCookieAuth_Admin, (req, res)=> {
  const {
    id
  } = req.params;
  const sql = `SELECT
    oc.Order_id,
    c.Product_id,
    c.User_id,
    c.Qty,
    p.Name AS product_name,
    p.Rating AS product_rating,
    p.Status AS product_status,
    sz.Rs,
    s.Name AS Size,
    o.Status As order_status,
    o.Address ,
    o.Time

    
FROM
    Oder_card oc
INNER JOIN Card c ON
    oc.Card_id = c.Id
INNER JOIN Product p ON
    c.Product_id = p.Id
INNER JOIN Size_ sz ON
    c.Size_id = sz.Id
INNER JOIN Size s ON
    sz.Size_id = s.Id
INNER JOIN `+'`Order`'+` o On oc.Order_id = o.Id
WHERE
    oc.Order_id = ? ORDER BY o.Id DESC`;
  db.query(sql,
    [id],
    (err, result)=> {
      if (err) throw err
      res.send(result);
    })

})
router.get("/api/v1/f/myOder/detail/:id", (req, res)=> {
  const {
    id
  } = req.params;
  const sql = `SELECT
    oc.Order_id,
    c.Product_id,
    c.User_id,
    c.Qty,
    p.Name AS product_name,
    p.Rating AS product_rating,
    p.Status AS product_status,
    sz.Rs,
    s.Name AS Size,
    o.Status As order_status,
    o.Address ,
    o.Time,
    otp.Place_otp,
    otp.Cancel_otp,
    otp.Delete_otp

    
FROM
    Oder_card oc
INNER JOIN Card c ON
    oc.Card_id = c.Id
INNER JOIN Product p ON
    c.Product_id = p.Id
INNER JOIN Size_ sz ON
    c.Size_id = sz.Id
INNER JOIN Otp otp On
otp.Oder_id = oc.Order_id

INNER JOIN Size s ON
    sz.Size_id = s.Id
INNER JOIN `+'`Order`'+` o On oc.Order_id = o.Id  
WHERE 
    oc.Order_id = ? ORDER BY c.Qty DESC`;
    
    
    
  db.query(sql,
    [id],
    (err, result)=> {
      if (err) throw err
      res.send(result);
    })

})








router.get("/api/v1/order/:id", (req, res)=> {
  const {
    id
  } = req.params;
  const sql = "SELECT * FROM `Order` WHERE Id = ?";
  db.query(sql,
    [id],
    (err, result)=> {
      if (err) throw err
      res.send(result);
    })

})


router.post("/api/order/", (req, res)=> {
  const {
    UserId, ProductId, SizeId, Status
  } = req.body
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
  db.query(sql,
    [UserId,
      ProductId,
      SizeId,
      Status],
    (err, result)=> {
      if (err) throw err
      res.send({
        msg: 1
      });
    })

})

router.put("/api/order/:id", (req, res)=> {
  const {
    id
  } = req.params;
  const {
    UserId, ProductId, SizeId, Status
  } = req.body
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
  db.query(sql,
    [UserId,
      ProductId,
      SizeId,
      Status,
      id],
    (err, result)=> {
      if (err) throw err
      res.send({
        msg: 1
      });
    })

})




router.post("/api/v1/order", async(req, res)=> {
  //var cardArr=JSON.parse(req.body.card_arr);

  //  const user_id = req.user.id;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert Product
    const [productResult] = await connection.execute(
      //   `INSERT INTO Order (Time, Status, User_id, Address, Payment_mathed, Payment_id, Payment_time, Paymented, Delivered, Delivered_time) VALUES (current_timestamp(), 1, 1, ? ,  ?, ?, ?, ?, ?, ?)`
      " INSERT INTO `Order` (`Id`, `Time`, `Status`, `User_id`, `Address`, `Payment_mathed`, `Payment_id`, `Payment_time`, `Paymented`, `Delivered`, `Delivered_time`) VALUES (NULL, current_timestamp(), '1', '1', 'jhool', 'case on ', '22\"\"55 ', 'Cgxxv x d xx', '1', '1', 'Gxgd')",
      [

        138,
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


    for (const card of req.body.card_arr) {
      await connection.execute(
        `INSERT INTO Oder_card ( Card_id, Time, Order_id,Status) VALUES (?, current_timestamp(), ?,0);`,
        [card, orderId,]
      );
    }
    console.log("ok", orderId)

    // await connection.commit();
    ///res.status(200).json({ message: 'Product added successfully' });


    const emailOptions = {
      receiverEmail: "kumaradarsh00572@gmail.com",
      // Assuming the user's email is passed in the request body
      subject: "Order Confirmation",
      message: `Your order with ID ${orderId} has been successfully placed. Thank you for shopping with us!`
    };



    try {
      await fetch('http://localhost:3000/api/send-email/', {
        Method: 'POST',
        Headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        Body: emailOptions,
        Cache: 'default'
      })
      console.log("email")
      res.status(200).json({
        message: 'Order added successfully and email sent!'
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(200).json({
        message: 'Order added successfully but failed to send email.'
      });
    }

  } catch (error) {
    console.log("not add", error)
    await connection.rollback();
    res.status(500).json({
      error: 'An error occurred while adding the product'
    });
  } finally {
    connection.release();
  }





})
router.post("/api/v4/order", async(req, res)=> {

  const {
    Address,
    Payment_time,
    Payment_mathed,
    Payment_id,
    Paymented,
    Delivered,
    Delivered_time
  } = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert Product
    const [productResult] = await connection.execute(
      //   `INSERT INTO Order (Time, Status, User_id, Address, Payment_mathed, Payment_id, Payment_time, Paymented, Delivered, Delivered_time) VALUES (current_timestamp(), 1, 1, ? ,  ?, ?, ?, ?, ?, ?)`
      " INSERT INTO `Order` (`Id`, `Time`, `Status`, `User_id`, `Address`, `Payment_mathed`, `Payment_id`, `Payment_time`, `Paymented`, `Delivered`, `Delivered_time`) VALUES (NULL, current_timestamp(), '1', ?, ?, ? ,  ?,?, ?, ?, ?)",
      [138, Address, Payment_mathed, Payment_id, Payment_time, Paymented, Delivered, Delivered_time]
    );
    const orderId = productResult.insertId;


    for (const card of req.body.card_arr) {
      await connection.execute(
        `INSERT INTO Oder_card ( Card_id, Time, Order_id,Status) VALUES (?, current_timestamp(), ?,0);`,
        [card, orderId,]
      );
    }
    console.log("ok", orderId)

     await connection.commit();
    res.status(200).json({ message: 'Product added successfully' });
/*

    const emailOptions = {
      receiverEmail: "kumaradarsh00572@gmail.com",
      // Assuming the user's email is passed in the request body
      subject: "Order Confirmation",
      message: `Your order with ID ${orderId} has been successfully placed. Thank you for shopping with us!`
    };
    try {
      await fetch('http://localhost:3000/api/send-email/', {
        Method: 'POST',
        Headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        Body: emailOptions,
        Cache: 'default'
      })
      console.log("email")
      res.status(200).json({
        message: 'Order added successfully and email sent!'
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(200).json({
        message: 'Order added successfully but failed to send email.'
      });
    }
*/
  } catch (error) {
    console.log("not add", error)
    await connection.rollback();
    res.status(500).json({
      error: 'An error occurred while adding the product'
    });
  } finally {
    connection.release();
  }





})
router.post("/api/v5/order",checkCookieAuth, async(req, res)=> {

  const {
    Address,
    Payment_time,
    Payment_mathed,
    Payment_id,
    Paymented,
    Delivered,
    Delivered_time
  } = req.body;

const {id}= req.user;


  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert Product
    const [productResult] = await connection.execute(
      //   `INSERT INTO Order (Time, Status, User_id, Address, Payment_mathed, Payment_id, Payment_time, Paymented, Delivered, Delivered_time) VALUES (current_timestamp(), 1, 1, ? ,  ?, ?, ?, ?, ?, ?)`
      " INSERT INTO `Order` (`Id`, `Time`, `Status`, `User_id`, `Address`, `Payment_mathed`, `Payment_id`, `Payment_time`, `Paymented`, `Delivered`, `Delivered_time`) VALUES (NULL, current_timestamp(), '1', ?, ?, ? ,  ?,?, ?, ?, ?)",
      [id, Address, Payment_mathed, Payment_id, Payment_time, Paymented, Delivered, Delivered_time]
    );
    const orderId = productResult.insertId;

//INSERT INTO `Otp` (`Id`, `Delete_otp`, `Cancel_otp`, `Place_otp`, `Oder_id`) VALUES (NULL, '1627', '1426', '2622', '2');


const otp = ()=>{
   var otp =  Math.floor((Math.random()*(9999-1000+1))+1000);
       return  otp;
}

   await connection.execute(
        "INSERT INTO `Otp` (`Id`, `Delete_otp`, `Cancel_otp`, `Place_otp`, `Oder_id`) VALUES (NULL, ?, ?, ?, ?);",
        [  otp(),  otp(), otp(), orderId,]
      );


    for (const card of req.body.card_arr) {

      await connection.execute(
        `INSERT INTO Oder_card ( Card_id, Time, Order_id,Status) VALUES (?, current_timestamp(), ?,Status);`,
        [card, orderId,]
      );
    }
    for (const card_ of req.body.card_arr) {
      await connection.execute(
        "UPDATE `Card` SET `Status` = '1' WHERE `Card`.`Id` = ?",
        [card_]
        
      );
      
    }
    console.log("ok", orderId)





     await connection.commit();
    res.status(200).json({ message: 'Product added successfully' });
/*

    const emailOptions = {
      receiverEmail: "kumaradarsh00572@gmail.com",
      // Assuming the user's email is passed in the request body
      subject: "Order Confirmation",
      message: `Your order with ID ${orderId} has been successfully placed. Thank you for shopping with us!`
    };
    try {
      await fetch('http://localhost:3000/api/send-email/', {
        Method: 'POST',
        Headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        Body: emailOptions,
        Cache: 'default'
      })
      console.log("email")
      res.status(200).json({
        message: 'Order added successfully and email sent!'
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(200).json({
        message: 'Order added successfully but failed to send email.'
      });
    }
*/
  } catch (error) {
    console.log("not add", error)
    await connection.rollback();
    res.status(500).json({
      error: 'An error occurred while adding the product'
    });
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
        "INSERT INTO Oder_card (Card_id, Time, Order_id,Status) VALUES (?, current_timestamp(), ?,0);",
        [card, orderId]
      );
    }

    // Commit the transaction before sending the email
    await connection.commit();

    // Send an email to the user
    const emailOptions = {
      receiverEmail: req.body.email || "kumaradarsh00572@gmail.com",
      // Use dynamic email from request body
      subject: "Order Confirmation",
      message: `Your order with ID ${orderId} has been successfully placed. Thank you for shopping with us!`
    };

    try {
      await sendEmail({
        body: emailOptions
      }, res);
      res.status(200).json({
        message: 'Order added successfully and email sent!'
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(200).json({
        message: 'Order added successfully but failed to send email.'
      });
    }

  } catch (error) {
    console.log("Failed to add order:", error);
    await connection.rollback();
    res.status(500).json({
      error: 'An error occurred while adding the order'
    });
  } finally {
    connection.release();
  }
});

router.post("/api/v3/order",checkCookieAuth, async(req, res)=> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert Product
    const [productResult] = await connection.execute(
      //   `INSERT INTO Order (Time, Status, User_id, Address, Payment_mathed, Payment_id, Payment_time, Paymented, Delivered, Delivered_time) VALUES (current_timestamp(), 1, 1, ? ,  ?, ?, ?, ?, ?, ?)`
      " INSERT INTO `Order` (`Id`, `Time`, `Status`, `User_id`, `Address`, `Payment_mathed`, `Payment_id`, `Payment_time`, `Paymented`, `Delivered`, `Delivered_time`) VALUES (NULL, current_timestamp(), '1', '1', 'jhool', 'case on ', '22\"\"55 ', 'Cgxxv x d xx', '1', '1', 'Gxgd')",
      [

        req.user.id,
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

    console.log("ok", orderId)

    for (const card of req.body.card_arr) {
      await connection.execute(
        `INSERT INTO Oder_card ( Card_id, Time, Order_id,Status) VALUES (?, current_timestamp(), ?,0);`,
        [card, orderId,]
      );
    }

    // await connection.commit();
    res.status(200).json({
      message: 'Product added successfully'
    });
  } catch (error) {
    console.log("not add", error)
    await connection.rollback();
    res.status(500).json({
      error: 'An error occurred while adding the product'
    });
  } finally {
    connection.release();
  }





})


router.delete("/api/Order/:id", (req, res)=> {
  const {
    id
  } = req.params;
  console.log(id)
  const sql = "DELETE FROM `Order` WHERE Id = ?;"
  db.query(sql, [Number(id)], (err, result)=> {
    if (err) throw err;
    res.send({
      msg: 1
    });
  })

})
router.delete("/api/v1/admin/Order/:id", checkCookieAuth_Admin, (req, res)=> {
  const {
    id
  } = req.params;
  console.log(id)
  const sql = "DELETE FROM `Order` WHERE Id = ?;"
  const sql_1 = "DELETE FROM `Oder_card` WHERE Order_id = ?"
  db.query(sql,
    [Number(id)],
    (err, result)=> {
      if (err) throw err;
      db.query(sql_1,
    [Number(id)],
    (err, result)=> {
      if (err) throw err;
      res.send({
        msg: 1
      });
    })
    /*  res.send({
        msg: 1
      });*/
    })
  
    
    

})
/*
router.patch("/api/v2/admin/delete/Order/:id/", checkCookieAuth_Admin, (req, res)=> {
  const {
    id
  } = req.params;
  const {otp} = req.body;
  console.log(otp)
  
   const sqlx=  "SELECT `Delete_otp` FROM `Otp` otp Inner join `Order` o On otp.`Oder_id` = o.Id where o.Id = ?";
   db.query(sqlx,[Number(id)],(err,result)=>{
     if (err) throw err;
     console.log(result);
     if(result[0].Delete_otp==otp){
  const sql = "DELETE FROM `Order` WHERE Id = ?;"
  const sql_1 = "DELETE FROM `Oder_card` WHERE Order_id = ?"

       db.query(sql,
    [Number(id)],
    (err, result)=> {
      if (err) throw err;
      db.query(sql_1,
    [Number(id)],
    (err, result)=> {
      if (err) throw err;
      //res.send({
        msg: 1
      });
      res.status(200).json({
        msg: "delect successfully"
        
      });
    })
      
      console.log("ok");
    })
     }else{
       res.status(400).json({msg:"otp not match"})
       
     }
     
   })
})
  
  */

router.patch("/api/v2/admin/delete/Order/:id/", checkCookieAuth_Admin, (req, res) => {
  const {
    id
  } = req.params;
  const { otp } = req.body;

  const sqlx = "SELECT `Delete_otp` FROM `Otp` otp Inner join `Order` o On otp.`Oder_id` = o.Id where o.Id = ?";

  db.query(sqlx, [Number(id)], (err, result) => {
    if (err) throw err;

    if (result[0].Delete_otp == otp) {

      const sql = "DELETE FROM `Order` WHERE Id = ?;"
      const sql_1 = "DELETE FROM `Oder_card` WHERE Order_id = ?"

        db.query(sql, [Number(id)],  (err, result) => {
                    if (err) throw err;
        db.query(sql_1, [Number(id)],  (err, result) => { 
                    if (err) throw err;
            res.status(200).json({
              msg: "delect successfully"

            });

          
          
          
        })
        })







    } else {
      res.status(400).json({ msg: "otp not match" })

    }



  })
})





// UPDATE `Order` SET `Status` = '2' WHERE `Order`.`Id` = 133;


router.patch("/api/update/Order/Status", (req, res)=> {
  const {
    stutes, order_id
  } = req.body;
  //const sql ="DELETE FROM Favorites WHERE User_id = ? and Product_id =?";
  // const sql = "DELETE FROM `Favorites` WHERE `Favorites`.`User_id` = ?  AND Product_id= ?";
  const sql = "UPDATE `Order` SET `Status` = ? WHERE `Order`.`Id` = ?";
  db.query(sql,
    [stutes,
      order_id],
    (err, result)=> {
      if (err) throw err
      res.send({
        msg: 1
      })

    })


})
router.patch("/api/v1/update/Order/Status", (req, res)=> {
  const {
    stutes, order_id,otp
  } = req.body;
// var x1=  "cancle", "panding", 'complete'
   var x2 = "";
if(stutes==0){
  x2="Cancel_otp"
  
}else if(stutes==1){
  x2="Panding_otp"
}else if (stutes ==2){
  x2="Place_otp"
}

     const sqlx=  "SELECT "+x2+" FROM `Otp` otp Inner join `Order` o On otp.`Oder_id` = o.Id where o.Id = ?";

db.query(sqlx,[order_id],(err,result)=>{
  if (err) throw err 
  
  if( result[0][x2] == otp){
  const sql = "UPDATE `Order` SET `Status` = ? WHERE `Order`.`Id` = ?";
  db.query(sql,
    [stutes,
      order_id],
    (err, result)=> {
      if (err) throw err
  res.status(200).json({msg:"UPDATE successfully"})
      

    })

  }else{
  res.status(400).json({msg:" otp not meach"})
    
  }
  
})
  
  
  

})







module.exports = router;