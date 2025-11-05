// ---- middleware/authorize.middleware.js ----

// This middleware checks if the user's role is in the allowedRoles array
// It must be used *after* the 'protect' middleware

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // 'req.user.role' was set by the 'protect' middleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      // 403 = Forbidden
      return res.status(403).json({
        message: `Forbidden: Your role (${req.user.role}) is not authorized`,
      });
    }

    // If the role is allowed, move to the next middleware or route
    next();
  };
};