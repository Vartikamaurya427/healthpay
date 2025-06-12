const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // your App Password
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendPasswordEmail = async (toEmail, password) => {
  const mailOptions = {
    from: `"HealthPay" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your HealthPay Login Password',
    text: `Welcome to HealthPay! Your login password is: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password email sent successfully');
  } catch (error) {
    console.error(' Email error:', error);
  }
};

module.exports = sendPasswordEmail;
