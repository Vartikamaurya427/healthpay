
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-config.json"); // ✔️ path updated

admin.initializeApp({

  
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
