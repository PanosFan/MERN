const router = require("express").Router();
const {
  getPost,
  createPost,
  deletePost,
  editPost,
  getDetails,
} = require("../controllers/postsController");

router.get("/", getPost);

router.get("/:id", getDetails);

router.post("/", createPost);

router.put("/:id", editPost);

router.delete("/:id", deletePost);

module.exports = router;
