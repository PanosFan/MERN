const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ response: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKENSECRET);
    await User.findById(verified._id).then(
      (result) => (req.user = { id: result.id, name: result.name })
    );
    next();
  } catch (error) {
    res.status(400).json({ response: "Invalid token" });
  }
};

module.exports = isAuth;
