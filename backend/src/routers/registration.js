const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const {checkCookieAuth} = require('../Utility/Auth_midd');
const checkCookieAuth = require("../Utility/Auth_midd")

const router = express.Router();
const db = require('../db/conn');



const users = [
  { id: 1, username: 'testuser', password: 'testpass' }
];








//router.use(checkCookieAuth)


router.post('/register', (req, res) => {
  const { name, password ,phone,email} = req.body;
  console.log(req.body)
  const hashedPassword = bcrypt.hashSync(password, 8);

  //const sql = 'INSERT INTO User (username, password) VALUES (?, ?)';
 const sql = 'INSERT INTO `User` (`Name`,`Email`, `Password`, `Username`, `Phone` ,`Address`) VALUES (?, ?, ?, ?, ?,"");';
  //const sql = "INSERT INTO `User` (`Id`, `Name`, `Date`, `Email`, `Password`, `Username`, `Phone`) VALUES (NULL, 'Name', current_timestamp(), 'Email', 'Password ', 'Username ', 'Phone');";
  
  db.query(sql,[name,email, hashedPassword,name,phone], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error');
    }
          console.log("ok")
    res.cookie("authToken","1122222").status(201).send('User registered');
    //const token = jwt.sign({ id:name  }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }); // Use a secure key in production
   // res.status(200).send({ auth: true, token });
  });
});





router.post('/login_0', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const sql = 'SELECT * FROM User WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.Password);
    //const passwordIsValid = true;

    if (!passwordIsValid) {
      return res.status(401).send(user);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }); // Use a secure key in production
  const option ={httpOnly: true  }
    res.status(200).send({ auth: true, token }).cookie("token",token);

  


    console.log("Login successful");
  });
});
router.post('/login', (req, res) => {
  const { email, password } = req.body;
 /// console.log(req.body);

  const sql = 'SELECT * FROM User WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.Password);

    if (!passwordIsValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }); // Use a secure key in production

    //res.cookie('authToken', token, { httpOnly: true, secure: true })
    /*
    res.cookie('authToken', token)
      .status(200)
      .send({ authToken: true, token });
*/
    res.cookie('authToken', token, {
    path: '/',
    httpOnly: false, // Keep it secure from JavaScript
    secure: false, // Only enable secure in production
    sameSite: 'Lax', // SameSite None for production, Lax for development
  }).send("Login successful");
   // console.log("Login successful");
  });
});

router.get("/vv1",checkCookieAuth,(req,res)=>{
  res.send("ok");
})









module.exports = router;
