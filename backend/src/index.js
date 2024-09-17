const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
/*
app.use(cors({
  //origin: 'http://127.0.0.1:3000/',
 //origin: 'http://localhost:5173',
 origin: 'http://localhost:7700',
  
  credentials: true
}));
*/
const allowedOrigins = ['http://localhost:5173', 'http://localhost:7700','http://localhost:3000','https://fast-food-v4.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());







const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routers/registration');
const category_Routes = require('./routers/Category');
const show_category_Routes = require('./routers/Show_Category');
const show_product_Routes = require('./routers/Product');
const size_Routes = require('./routers/Size');
const size__Routes = require('./routers/Size_');
const user_Routers = require('./routers/User');
const order_Routers = require('./routers/Order');
const admin_login_Routers = require('./routers/Admin_login');
const favorites_Routers = require('./routers/Favorites');
const card_Routers = require('./routers/Card');
const mailRoutes = require('./routers/mailRoutes');
const poster_Routers = require('./routers/Poster');

dotenv.config({path:"./src/.env"});


//app.use(cors());


app.use(bodyParser.json());
const users = [
  { id: 1, username: 'testuser', password: 'testpass' }
];



/*

app.get("/v2", (req, res) => {
  res.cookie('token', "v2", {
    path: '/',
    httpOnly: false, // Keep it secure from JavaScript
    secure: false, // Only enable secure in production
    sameSite: 'Lax', // SameSite None for production, Lax for development
  }).send("ok");
});
*/


app.get("/",(req,res)=>{
  res.send("ok")
})





app.use(userRoutes);
app.use(category_Routes);
app.use(show_category_Routes);
app.use(show_product_Routes);
app.use(size_Routes);
app.use(size__Routes);
app.use(user_Routers);
app.use(favorites_Routers);
app.use(card_Routers);
app.use(admin_login_Routers);
app.use(order_Routers);
app.use(poster_Routers);


app.use('/api', mailRoutes);









const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
