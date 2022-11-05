module.exports = function (req, res, next) {
    // req.user set by auth middleware
    if (!req.user.isAdmin) return res.status(403);
  
    next();
  };