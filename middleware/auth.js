const jwt = require("jsonwebtoken");

module.exports.authentication = (req, res, next) => {
  const token = req.header("token");
  console.log('token',token)
  if (!token) {
    
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports.roleVerification = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};
