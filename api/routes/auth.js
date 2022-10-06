const router = require("express").Router();
const isAuth = require("../middleware/isAuth");
const {
  registerUser,
  loginUser,
  editPassword,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change_password/:id", isAuth, editPassword);

module.exports = router;
