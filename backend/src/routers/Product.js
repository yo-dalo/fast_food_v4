
const express = require('express');
const db = require('../db/conn'); // Adjust the path to your db connection module
const multer = require('multer');
const path = require('path');
const pool = require('../db/pool'); // Adjust the path to your db connection module


const router = express.Router();
//get all Product
router.get('/api/Product/', (req, res) => {
  const sql = 'SELECT * FROM Product';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});
//get only id
router.get('/api/Product/getId', (req, res) => {
  const sql = 'SELECT Id FROM Product';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    
  });
});
//get singel product
router.get('/api/Product/:id', (req, res) => {
  const {id} = req.params;
  const sql = 'SELECT * FROM Product WHERE Id = ?';
  db.query(sql,[id], (err, result) => {
    if (err) throw err;
    res.send(result);
    //console.log(result)
  });
});

router.get('/api/f/v1/Product', (req, res) => {
  const sql = `
    SELECT 
      p.Id AS product_id, 
      p.Name AS product_name, 
      p.Rs AS product_price, 
      p.Details AS product_details, 
      p.Rating AS product_rating, 
      p.Time AS product_time, 
      p.Status AS product_status,
      pi.Img AS product_image,
      s.Name AS size_name, 
      sz.Id AS size_id, 
      
      sz.Rs AS size_price
    FROM 
      Product p
    LEFT JOIN 
      Product_img pi ON p.Id = pi.Product_id
    LEFT JOIN 
      Size_ sz ON p.Id = sz.Product_id
    LEFT JOIN 
      Size s ON sz.Size_id = s.Id
    WHERE 
      p.Status = 1;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    //res.send(results)
    
    // Group the results by product
    const products = {};
    results.forEach(row => {
      if (!products[row.product_id]) {
        products[row.product_id] = {
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          product_details: row.product_details,
          product_rating: row.product_rating,
          product_time: row.product_time,
          product_status: row.product_status,
          images: [],
          sizes: []
        };
      }
      
      if (row.product_image && !products[row.product_id].images.includes(row.product_image)) {
        products[row.product_id].images.push(row.product_image);
      }
      
      if (row.size_name) {
        products[row.product_id].sizes.push({
          size_name: row.size_name,
          size_price: row.size_price
        });
      }
    });

    res.json(Object.values(products));
  });
});
router.get('/api/f/v2/Product', (req, res) => {
  const sql = `
    SELECT 
      p.Id AS product_id, 
      p.Name AS product_name, 
      p.Rs AS product_price, 
      p.Details AS product_details, 
      p.Rating AS product_rating, 
      p.Time AS product_time, 
      p.Status AS product_status,
      pi.Img AS product_image,
      s.Name AS size_name, 
      s.Id AS size_id, 
      sz.Rs AS size_price
    FROM 
      Product p
    LEFT JOIN 
      Product_img pi ON p.Id = pi.Product_id
    LEFT JOIN 
      Size_ sz ON p.Id = sz.Product_id
    LEFT JOIN 
      Size s ON sz.Size_id = s.Id
    WHERE 
      p.Status = 1;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    //res.send(results)
    
    // Group the results by product
    const products = {};
    results.forEach((row,i) => {
      
    const key = `${row.product_id}_`;
      if (!products[key]) {
        products[key] = {
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          product_details: row.product_details,
          product_rating: row.product_rating,
          product_time: row.product_time,
          product_status: row.product_status,
          images: [row.product_image],
          sizes:  {
          [row.size_id]: [row.size_price,row.size_name], }
        };
      }
      else{
        
      
        products[key].images.push(row.product_image);
        products[key].sizes[row.size_id] = [row.size_price,row.size_name]

       /* if(products[key].sizes[0].size_name.includes(row.size_name)){
        products[key].sizes.push({
          size_name: row.size_name,
          size_price: row.size_price,
          size_id: row.size_id,
        })
             console.log(products[key].sizes)
        */
        
      }
        
        
      


    });
//res.send(results)
    res.json(Object.values(products));
  });
});

router.get('/api/f/v1/Product/:id', (req, res) => {
 //const {id_ } = res.params;
 const {id} = req.params;
 //console.log(id_)
  const sql = `
    SELECT 
      p.Id AS product_id, 
      p.Name AS product_name, 
      p.Rs AS product_price, 
      p.Details AS product_details, 
      p.Rating AS product_rating, 
      p.Time AS product_time, 
      p.Status AS product_status,
      pi.Img AS product_image,
      s.Name AS size_name, 
      sz.Id AS size_id, 
      sz.Rs AS size_price,
      ca.Name AS Category_Name
    FROM 
      Product p
    LEFT JOIN 
      Product_img pi ON p.Id = pi.Product_id
    LEFT JOIN 
      Size_ sz ON p.Id = sz.Product_id
    LEFT JOIN 
      Size s ON sz.Size_id = s.Id
      LEFT JOIN 
      Category ca ON p.Category_id = ca.Id
    WHERE 
      p.Status = 1 and p.Id = ?;
  `;

  db.query(sql, [id],(err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
   // res.send(results)
    
    // Group the results by product
    const products = {};
    results.forEach(row => {
      if (!products[row.product_id]) {
        products[row.product_id] = {
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          product_details: row.product_details,
          product_rating: row.product_rating,
          product_time: row.product_time,
          product_status: row.product_status,
          images: row.product_image,
          //sizes: []
          Category_Name:row.Category_Name,
        };
      }
      
    });

   res.json(Object.values(products));
    
  });
});
router.get('/api/f/v2/Product/:id', (req, res) => {
 //const {id_ } = res.params;
 const {id} = req.params;
 //console.log(id_)
  const sql = `
    SELECT 
      p.Id AS product_id, 
      p.Name AS product_name, 
      p.Category_id,
      p.Rs AS product_price, 
      p.Details AS product_details, 
      p.Rating AS product_rating, 
      p.Time AS product_time, 
      p.Status AS product_status,
      pi.Img AS product_image,
      s.Name AS size_name, 
      sz.Id AS Size_id, 
      sz.Rs AS size_price
    FROM 
      Product p
    LEFT JOIN 
      Product_img pi ON p.Id = pi.Product_id
    LEFT JOIN 
      Size_ sz ON p.Id = sz.Product_id
    LEFT JOIN 
      Size s ON sz.Size_id = s.Id
    WHERE 
      p.Status = 1 and p.Id = ?;
  `;

  db.query(sql, [id],(err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    function convertData_3(card) {
  const uniqueItems = {};
  card.forEach(item => {
    const key = `${item.Product_id}_${item.Category_id}`;
    if (!uniqueItems[key]) {
      // If the item is unique, create a new entry
      uniqueItems[key] = {
        product_id: item.product_id,
          product_name: item.product_name,
          product_price: item.product_price,
          product_details: item.product_details,
          product_rating: item.product_rating,
          product_time: item.product_time,
          product_status: item.product_status,
        Img: [item.product_image],
        Size: [{ size_name: `${item.size_name}`,  size_id: item.Size_id, size_price: item.size_price }], // Initial Size array
        
      };
    } else {
      // If the item already exists, check for duplicates in Size
      const existingSize = uniqueItems[key].Size.find(size => size.size_id === item.Size_id);
      if (!existingSize) {
        uniqueItems[key].Size.push({ size_name: `${item.size_name}`, size_id: item.Size_id, size_price: item.Rs ,size_price: item.size_price});
      }

      // Check for duplicates in Img array
      if (!uniqueItems[key].Img.includes(item.product_image)) {
        uniqueItems[key].Img.push(item.product_image);
      }
    }
  });

  // Convert the uniqueItems object back to an array
  return Object.values(uniqueItems);
}

    

   res.json(Object.values(convertData_3(results)));
    
  });
});


router.delete('/api/a/v1/Product/:id', (req, res) => {
  const productId = req.params.id;

  // First, delete related entries in the Product_img and Size_ tables
  const deleteRelatedEntriesSql = `
    DELETE FROM Product_img WHERE Product_id = ?;
    DELETE FROM Size_ WHERE Product_id = ?;
  `;

  db.query(deleteRelatedEntriesSql, [productId, productId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Now, delete the product from the Product table
    const deleteProductSql = 'DELETE FROM Product WHERE Id = ?';
    db.query(deleteProductSql, [productId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
    });
  });
});




//status product











router.patch('/api/Product/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE Product SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category status updated', id, status });
  });
});
//delete
router.delete('/api/Product/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Product WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category deleted', id });
  });
});

//edit
router.put('/api/Product/:id', (req, res) => {
    const { id } = req.params;
  const { name, status, image } = req.body;
  const sql = 'UPDATE categories SET name = ?, status = ?, image = ? WHERE id = ?';
  db.query(sql, [name, status, image, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Category updated', id });
  });
});




///edit

router.put('/api/v2/product/:id', (req, res) => {
    const productId = req.params.id;
    const { Name, Rs, Details, Rating, Time, Status, Category_id } = req.body;

    const query = `
        UPDATE Product 
        SET Name = ?, Rs = ?, Details = ?, Rating = ?, Time = ?, Status = ?, Category_id = ?
        WHERE Id = ?`;

    db.query(query, [Name, Rs, Details, Rating, Time, Status, Category_id, productId], (err, result) => {
        if (err) {
            console.error('Failed to update product:', err);
            res.status(500).json({ error: 'Failed to update product' });
        } else {
            res.json({ message: 'Product updated successfully' });
        }
    });
});





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +'_'+ path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/api/product",upload.array('file', 10),async(req,res)=>{
  
  const file = req.files;
 var sizeArr=JSON.parse(req.body.size_arr);
  for(const x of sizeArr){console.log(x.size)}
  
  const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert Product
        const [productResult] = await connection.execute(
            `INSERT INTO Product (Name, Date, Rs, Details, Rating, Time, Status, Category_id, User_id) 
             VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.body.name,
                req.body.rs,
                req.body.details,
                req.body.rating,
                req.body.time,
                req.body.status,
                req.body.category_id,
                1
            ]
        );
        const productId = productResult.insertId;

        // Insert Product Images
        for (const image of req.files) {
            await connection.execute(
                `INSERT INTO Product_img (Img, Product_id) VALUES (?, ?)`,
                [image.filename, productId]
            );
        }
/*
        // Insert Sizes and Size Information for the Product
        
        for (const size of req.body.sizes) {
        
            const [sizeResult] = await connection.execute(
                `INSERT INTO Size (Name, Date) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE Id=LAST_INSERT_ID(Id)`,
                [size.name]
            );
            const sizeId = sizeResult.insertId;

            await connection.execute(
                `INSERT INTO Size_ (Size_id, Product_id, Rs) VALUES (?, ?, ?)`,
                [sizeId, productId, size.price]
            );
        }
        */
        
       for (const size of sizeArr){
          await connection.execute(
                `INSERT INTO Size_ (Size_id, Product_id, Rs) VALUES (?, ?, ?)`,
                [size.size, productId, size.price]
            );
        }

        await connection.commit();
        res.status(200).json({ message: 'Product added successfully' });

    } catch (error) {
        console.log("not add",error)
        await connection.rollback();
        res.status(500).json({ error: 'An error occurred while adding the product' });
    } finally {
        connection.release();
    }
  




})

router.put("/api/product/:id", upload.array('file', 10), async (req, res) => {
    const productId = req.params.id;
    const file = req.files;
    const sizeArr = JSON.parse(req.body.size_arr);

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Update Product
        await connection.execute(
            `UPDATE Product 
             SET Name = ?, Rs = ?, Details = ?, Rating = ?, Time = ?, Status = ?, Category_id = ? 
             WHERE Id = ?`,
            [
                req.body.name,
                req.body.rs,
                req.body.details,
                req.body.rating,
                req.body.time,
                req.body.status,
                req.body.category_id,
                productId
            ]
        );

        // Delete existing product images if new images are uploaded
        if (req.files.length > 0) {
            await connection.execute(
                `DELETE FROM Product_img WHERE Product_id = ?`,
                [productId]
            );

            // Insert new Product Images
            for (const image of req.files) {
                await connection.execute(
                    `INSERT INTO Product_img (Img, Product_id) VALUES (?, ?)`,
                    [image.filename, productId]
                );
            }
        }

        // Delete existing sizes
        await connection.execute(
            `DELETE FROM Size_ WHERE Product_id = ?`,
            [productId]
        );

        // Insert or update Sizes and Size Information for the Product
        for (const size of sizeArr) {
            await connection.execute(
                `INSERT INTO Size_ (Size_id, Product_id, Rs) VALUES (?, ?, ?)`,
                [size.size, productId, size.price]
            );
        }

        await connection.commit();
        res.status(200).json({ message: 'Product updated successfully' });

    } catch (error) {
        console.log("Failed to update product:", error);
        await connection.rollback();
        res.status(500).json({ error: 'An error occurred while updating the product' });
    } finally {
        connection.release();
    }
});



router.use('/uploads', express.static('uploads'));



  
   











router.post('/add-product', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert Product
        const [productResult] = await connection.execute(
            `INSERT INTO Product (Name, Date, Rs, Details, Rating, Time, Status, Category_id, User_id) 
             VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.body.name,
                req.body.rs,
                req.body.details,
                req.body.rating,
                req.body.time,
                req.body.status,
                req.body.category_id,
                req.body.user_id
            ]
        );
        const productId = productResult.insertId;

        // Insert Product Images
        for (const image of req.body.images) {
            await connection.execute(
                `INSERT INTO Product_img (Img, Product_id) VALUES (?, ?)`,
                [image, productId]
            );
        }

        // Insert Sizes and Size Information for the Product
        for (const size of req.body.sizes) {
            const [sizeResult] = await connection.execute(
                `INSERT INTO Size (Name, Date) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE Id=LAST_INSERT_ID(Id)`,
                [size.name]
            );
            const sizeId = sizeResult.insertId;

            await connection.execute(
                `INSERT INTO Size_ (Size_id, Product_id, Rs) VALUES (?, ?, ?)`,
                [sizeId, productId, size.price]
            );
        }

        await connection.commit();
        res.status(200).json({ message: 'Product added successfully' });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: 'An error occurred while adding the product' });
    } finally {
        connection.release();
    }
});





/*
{
    "Name": "Updated Burger",
    "Rs": "50",
    "Details": "Updated description for the burger",
    "Rating": "4.5",
    "Time": "15 minutes",
    "Status": 1,
    "Category_id": 2
}
*/


module.exports = router;