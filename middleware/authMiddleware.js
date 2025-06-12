const jwt = require("jsonwebtoken");
const { isBlacklisted } = require("../helpers/blacklist");

const authMiddleware = (req, res, next) => {
  console.log(" Headers received:", req.headers);
   // Declare authHeader first!
  const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token missing or invalid format");
    return res.status(401).json({ message: "Token missing or invalid!" });
  }
  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token);

  if (isBlacklisted(token)) {
    return res.status(401).json({ message: "Token has been logged out" });
  }
 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified, user:", decoded);
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid Token. Access Denied!" });
  }
};

module.exports = authMiddleware;

