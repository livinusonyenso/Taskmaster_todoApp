const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("❌ No Authorization header found");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract token (remove 'Bearer ' if present)
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  console.log("🔑 Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);
    req.user = decoded.id; // Ensure the decoded token contains an `id`
    next();
  } catch (err) {
    console.log("❌ Invalid Token:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
