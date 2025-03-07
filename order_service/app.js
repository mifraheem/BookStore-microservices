const express = require('express');
const bodyParser = require('body-parser');
const validateToken = require('./middlewares');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
const db = new sqlite3.Database('./orders.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    db.run('CREATE TABLE IF NOT EXISTS orders ( \
      id INTEGER PRIMARY KEY AUTOINCREMENT, \
      customer_name TEXT NOT NULL, \
      product_id INTEGER NOT NULL, \
      quantity INTEGER DEFAULT 1, \
      order_status TEXT DEFAULT "pending", \
      user_id INTEGER NOT NULL \
    )', (err) => {
      if (err) {
        console.error('Error creating table ' + err.message);
      }
    });

  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Order Service API');
});

app.get('/orders', (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.post('/orders', validateToken, (req, res) => {
  const { customer_name, product_id, quantity } = req.body;
  const user_id = req.user.user_id;

  if (!user_id) {
      
      return res.status(400).json({ "error": "User ID is required from token" });
  }

  const sql = 'INSERT INTO orders (customer_name, product_id, quantity, user_id) VALUES (?, ?, ?, ?)';
  db.run(sql, [customer_name, product_id, quantity, user_id], function(err) {
      if (err) {
          console.error('SQL Error:', err.message);
          return res.status(400).json({"error": err.message});
      }
      res.status(201).json({
          message: 'Order created successfully',
          order: {
              id: this.lastID,
              customer_name,
              product_id,
              quantity,
              user_id
          }
      });
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
