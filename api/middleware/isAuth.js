const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ response: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKENSECRET);
    req.user = verified._id;
    next();
  } catch (error) {
    res.status(400).json({ response: "Invalid token" });
  }
};

module.exports = isAuth;
