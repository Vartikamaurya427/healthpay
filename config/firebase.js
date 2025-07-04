
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-config.json"); // ✔️ path updated

admin.initializeApp({
credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
