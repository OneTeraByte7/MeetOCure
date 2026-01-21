const jwt = require("jsonwebtoken");
const User = require("../models/User");

// protect middleware: verifies JWT if present and optionally enforces role
const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      const auth = req.headers.authorization || req.headers.Authorization;
      if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, token missing" });
      }

      const token = auth.split(" ")[1];
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not set in environment");
        return res.status(500).json({ message: "Server misconfiguration" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.id) return res.status(401).json({ message: "Invalid token" });

      // Attach a minimal user object to req.user
      req.user = { id: decoded.id, role: decoded.role };

      if (roles && roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient role" });
      }

      // Optional: populate user from DB for convenience
      try {
        const user = await User.findById(req.user.id).select("_id name role");
        if (user) req.user = { id: user._id.toString(), role: user.role, name: user.name };
      } catch (e) {
        // ignore DB lookup errors here
      }

      next();
    } catch (err) {
      console.error("Auth middleware error:", err.message);
      return res.status(401).json({ message: "Not authorized" });
    }
  };
};

module.exports = protect;
