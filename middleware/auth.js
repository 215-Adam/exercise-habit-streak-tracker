const jwt = require("jsonwebtoken");
const { User } = require("../database/setup");

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = parts[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

module.exports = {
  requireAuth,
  requireRole
};
