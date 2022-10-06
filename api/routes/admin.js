const router = require("express").Router();
const {
  adminDeleteUser,
  adminGetUser,
} = require("../controllers/adminController");

router.get("/", adminGetUser);

router.delete("/:id", adminDeleteUser);

module.exports = router;
