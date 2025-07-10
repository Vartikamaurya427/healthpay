const axios = require('axios');

module.exports = async (phone, otp) => {
  try {
    const response = await axios.post(
      'https://api.msg91.com/api/v5/otp',
      {
        template_id: process.env.MSG91_TEMPLATE_ID,
        mobile: `+91${phone}`,
        otp: otp
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ OTP sent via Msg91:', response.data);
    return true;
  } catch (err) {
    console.error('❌ OTP send failed:', err.response?.data || err.message);
    return false;
  }
};
