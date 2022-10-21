const router = require("express").Router();
const {
  getPost,
  createPost,
  deletePost,
  editPost,
  getDetails,
  createComment,
} = require("../controllers/postsController");

router.get("/", getPost);

router.get("/:id", getDetails);

router.post("/", createPost);

router.post("/:id", createComment);

router.put("/:id", editPost);

router.delete("/:id", deletePost);

module.exports = router;
