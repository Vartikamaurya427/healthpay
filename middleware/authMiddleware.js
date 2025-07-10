const jwt = require("jsonwebtoken");
const { isBlacklisted } = require("../helpers/blacklist");

const authMiddleware = (req, res, next) => {
  console.log("Headers received:", req.headers);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid!" });
  }

  const token = authHeader.split(" ")[1];

  if (isBlacklisted(token)) {
    return res.status(401).json({ message: "Token has been logged out" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // includes { id, pinReset } etc.
    req.token = token;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid Token. Access Denied!" });
  }
};

module.exports = authMiddleware;
