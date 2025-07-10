// helpers/otp.js

// Generate a secure 6-digit OTP
exports.generate6DigitOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Simulate sending OTP to phone (replace with real service in production)
exports.sendOtpToPhone = async (phone, otp) => {
  console.log(`📲 Sending OTP ${otp} to phone ${phone}`);
  // Integrate actual SMS API here (e.g. Twilio, Fast2SMS, Msg91)
  return true;
};
