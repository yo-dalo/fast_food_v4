const express = require("express");
const db = require("../db/conn")
const bcrypt = require('bcryptjs');
const checkCookieAuth = require("../Utility/Auth_midd")

 
 const router = express.Router();
 

router.post("/api/v1/registration/", async (req, res) => {
  const { name, password, email } = req.body;

  // Validate email presence
  if (!email) {
    return res.status(400).send({ msg: 'Email is required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ msg: 'Invalid email format' });
  }

  // Check if email already exists
  const checkEmailSql = "SELECT * FROM `Admin` WHERE `Email` = ?";
  db.query(checkEmailSql, [email], async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.status(400).send({ msg: 'Email already exists' });
    }

    // If email is valid and does not exist, proceed with registration
    const hash_password = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO `Admin` (`Name`, `Date`, `Email`, `Password`, `Token`) VALUES (?, current_timestamp(), ?, ?, ?);";
    db.query(sql, [name, email, hash_password, "tokan"], (err, result) => {
      if (err) throw err;
      res.send({ msg: 1 });
    });
  });
});


router.post("/api/v1/login/", async (req, res) => {
  const { password, email } = req.body;

  const sql = "SELECT * FROM Admin WHERE Email=?";
  db.query(sql, [email], async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const user = result[0];
      console.log(user)
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.Password);
      
      if (isMatch) {
        res.send({ msg: 1 }); // Passwords match, login successful
      } else {
        res.send({ msg: 0 }); // Passwords do not match
      }
    } else {
      res.send({ msg: -1 }); // User not found
    }
  });
});






 router.get("/api/v1/admin/",(req,res)=>{
const sql ="SELECT * FROM Admin "
db.query(sql,(err,result)=>{
  if(err) throw errr
  res.send(result)
})
})



 router.delete("/api/v1/admin/:id",(req,res)=>{ 
const { id } = req.params;
  const sql = 'DELETE FROM Category WHERE id = ?';
db.query(sql,[id],(err,result)=>{
  if(err) throw errr
  res.send(result)
})
}) 
 
 
 
 
 
 
 
 module.exports= router;