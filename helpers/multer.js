const multer = require('multer');
const path = require('path');

const fs = require('fs');
const uploadDir = 'uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|avif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpg, png, avif)'));
  }
  if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
};
const upload = multer({ storage, fileFilter });

module.exports = upload;