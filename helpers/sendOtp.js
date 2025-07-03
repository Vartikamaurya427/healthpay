const axios = require('axios');

module.exports = async (phone, otp) => {
  try {
    const response = await axios.post('https://api.msg91.com/api/v5/otp', {
      template_id: 'YOUR_TEMPLATE_ID',
      mobile: '+91' + phone,
      otp: otp
    }, {
      headers: {
        authkey: 'YOUR_MSG91_AUTH_KEY',
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ OTP sent:', response.data);
  } catch (err) {
    console.error('❌ OTP send failed:', err.response?.data || err.message);
  }
};
