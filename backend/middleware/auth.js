// middleware/auth.js
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    // const token = req.cookies?.[process.env.COOKIE_NAME || "token"];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user id/email to req.user
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid/Expired token" });
  }
};

module.exports = requireAuth;
