const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");
const profileController = require('../controllers/profileController');
const { updateProfile } = require('../controllers/profileController');
const { changePassword } = require("../controllers/passwordController");
const { logout } = require("../controllers/userController");
const upload = require('../helpers/multer');




router.post('/register', userController.register);
router.post('/login', userController.login)
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to your dashboard!" });
});
router.get('/profile', authMiddleware, profileController.getProfile); 
router.put('/profile', authMiddleware, upload.single('profileImage'), updateProfile);
router.post("/change-password", authMiddleware, changePassword);
router.post("/logout", authMiddleware, logout);



module.exports = router;
