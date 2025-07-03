// const admin = require("firebase-admin");
const admin = require("../config/firebase");  
const sendNotification = async (token, title, body) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      token: token,  
    };
    const response = await admin.messaging().send(message); 
    console.log("Notification sent:", response);
    return true;
  } catch (error) {
    console.error("Error sending notification:", error);
    return false;
  }
};
module.exports = sendNotification;
