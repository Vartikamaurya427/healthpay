const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const db = {};

// ✅ Connect to MongoDB (adjust URI as needed)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Dynamically load all models in this folder
fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  ))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    const modelName = model.modelName || path.basename(file, '.js');
    db[modelName] = model;
  });

db.mongoose = mongoose;
module.exports = db;
