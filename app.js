const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

const app = express();

// Mongoose connect
const connectDB  = require('./config/db'); // ✅ MongoDB config file (mongoose)
connectDB(); // ← this must be called before server starts
 // connect MongoDB

require('./cron/deleteOldUsers'); // same as before

const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
const rewardRoutes = require('./routes/rewardRoutes');
const privacyRoutes = require('./routes/privacyRoutes');
const languageRoutes = require('./routes/languageRoutes');
const loginActivityRoutes = require('./routes/loginActivityRoutes');
const bankRoutes = require('./routes/bankRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const masterServiceRoutes = require('./routes/masterServiceRoutes');
const contactRoutes = require('./contact/contact.Routes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require("./fogetPassword/authRoutes")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
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
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
