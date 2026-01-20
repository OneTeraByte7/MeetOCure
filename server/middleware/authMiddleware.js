// Authentication and authorization disabled — middleware is now a no-op.
// This allows accessing protected routes without a token during development.
const protect = (roles = []) => {
  return (req, res, next) => {
    // Optionally attach a default user object if other code expects `req.user`.
    // req.user = { id: null, role: roles && roles.length ? roles[0] : "user" };
    next();
  };
};

module.exports = protect;
