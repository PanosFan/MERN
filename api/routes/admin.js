const {
  adminDeleteUser,
  adminGetUser,
} = require("../controllers/adminController");
const router = require("express").Router();

router.get("/", adminGetUser);

router.delete("/:id", adminDeleteUser);

module.exports = router;
