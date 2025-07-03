const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
  const rewardRoutes = require('./routes/rewardRoutes');
  const privacyRoutes = require('./routes/privacyRoutes');
  const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require("./fogetPassword/authRoutes")
  require('./cron/deleteOldUsers');  
const languageRoutes = require('./routes/languageRoutes');
const loginActivityRoutes = require('./routes/loginActivityRoutes');
const bankRoutes = require('./routes/bankRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const paymentRoutes = require('./routes/paymentRoutes');
const masterServiceRoutes = require('./routes/masterServiceRoutes');
const contactRoutes = require('./contact/contact.Routes');
const transactionRoutes = require('./routes/transactionRoutes');

const models = require('./models');

require('dotenv').config();
const app = express();
app.use(express.json());
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());  
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/users', userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/language', languageRoutes);
app.use('/api', loginActivityRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api', paymentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/services', masterServiceRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api', transactionRoutes); 
app.use('/api/auth', authRoutes); // Prefix for all auth routes
sequelize.sync({ alter: true })
// sequelize.sync({ force: false }) // make sure to NOT force drop in prod
  .then(() => {
    console.log('DB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));

