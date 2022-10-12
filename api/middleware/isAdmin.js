const isAdmin = (req, res, next) => {
  if (req.user.id != "6337278a070b9b637a5f4cea") {
    return res.status(401).json({ response: "Access denied" });
  }
  next();
};

module.exports = isAdmin;
