const admin = require("firebase-admin");
const FcmToken = require("../models/FcmToken"); // Make sure this is the Mongoose model

const getFcmToken = async (userId) => {
  try {
    const record = await FcmToken.findOne({ userId });
    return record ? record.token : null;
  } catch (err) {
    console.error("Error fetching FCM token:", err.message);
    return null;
  }
};

const sendNotification = async (token, title, body) => {
  try {
    const message = {
      notification: { title, body },
      token,
    };
    await admin.messaging().send(message);
  } catch (err) {
    console.error("Error sending notification:", err.message);
  }
};

module.exports = {
  getFcmToken,
  sendNotification,
};
