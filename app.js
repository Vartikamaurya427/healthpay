const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();
app.use(express.json());
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());  
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/storage", express.static(path.join(__dirname, "storage")));

app.use('/api/users', userRoutes);
sequelize.sync({ force: false })
  .then(() => {
    console.log('DB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));
