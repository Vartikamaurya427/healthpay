const sendNotification = require("../helpers/sendNotification");
const { FcmToken } = require("../models");
exports.sendPushNotification = async (req, res) => {
  try {
    const { userId, title, body } = req.body;
   const fcm = await FcmToken.findOne({ where: { userId } });
    if (!fcm) {
      return res.status(404).json({ message: "User or token not found" });
    }
 const result = await sendNotification(fcm.token, title, body);
    if (result) {
      res.status(200).json({ message: "Notification sent" });
    } else {
      res.status(500).json({ message: "Failed to send notification" });
    }
  } catch (err) {
    console.error("Error sending notification:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
