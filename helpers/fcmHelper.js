const { FcmToken } = require('../models');

const getFcmToken = async (userId) => {
  const record = await FcmToken.findOne({ where: { userId } });
  return record ? record.token : null;
};

const sendNotification = async (token, title, body) => {
  try {
    const message = {
      notification: { title, body },
      token,
    };
    await admin.messaging().send(message);
  } catch (err) {
    console.error(" Error sending notification:", err.message);
  }
};

module.exports = {
  getFcmToken,
  sendNotification,
};

