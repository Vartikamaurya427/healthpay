const admin = require("../config/firebase");  // Firebase Admin SDK initialized here

const sendNotification = async (token, title, body) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    const response = await admin.messaging().send(message);
    console.log("📨 Notification sent:", response);
    return true;
  } catch (error) {
    console.error("❌ Error sending notification:", error.message);
    return false;
  }
};

module.exports = sendNotification;
