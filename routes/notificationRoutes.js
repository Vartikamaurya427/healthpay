const express = require("express");
const router = express.Router();
const { sendPushNotification } = require("../controllers/notificationController");
router.post("/send", sendPushNotification);

module.exports = router;


