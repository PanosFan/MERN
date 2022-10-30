const {
  registerUser,
  loginUser,
  editPassword,
} = require("../controllers/userController");
const router = require("express").Router();
const isAuth = require("../middleware/isAuth");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change_password/:id", isAuth, editPassword);

module.exports = router;
