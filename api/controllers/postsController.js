const Post = require("../models/Post");
const ObjectId = require("mongoose").Types.ObjectId;

const getPost = (req, res) => {
  Post.find()
    .then((result) => res.json(result))
    .catch((error) => res.json({ error }));
};

const getDetails = async (req, res) => {
  const id = req.params.id;

  // checking if the id is a valid one
  const validID = ObjectId.isValid(id);
  if (!validID) return res.status(404).json({ error: "Id is not valid" });

  // checking if the id (which is now valid) is in the db
  const exists = await Post.findById(id);
  if (!exists) return res.status(404).json({ error: "Post not found" });

  Post.findById(id)
    .then((result) => res.json({ result }))
    .catch((error) => res.json({ error }));
};

const createPost = (req, res) => {
  if (!(req.body.title && req.body.content)) {
    return res.status(400).json({ error: "All fields are required" });
  }
  Post.create({
    ...req.body,
    user: req.user,
    likes: 0,
  })
    .then((result) => {
      res.json({ response: "Post saved", ...result._doc });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const deletePost = async (req, res) => {
  const id = req.params.id;

  // checking if the id is a valid one
  const validID = ObjectId.isValid(id);
  if (!validID) return res.status(404).json({ error: "Id is not valid" });

  // checking if the id (which is now valid) is in the db
  const exists = await Post.findById(id);
  if (!exists) return res.status(404).json({ error: "Post not found" });

  // checking if the id of the user requesting is the same as the id in db || admin can edit all
  if (
    req.user.id != exists.user.id &&
    req.user.id != "6337278a070b9b637a5f4cea"
  ) {
    return res.status(404).json({ error: "This post is not yours" });
  }

  Post.findByIdAndDelete(id)
    .then(res.json({ response: "Deleted" }))
    .catch((error) => res.json({ error }));
};

const createComment = async (req, res) => {
  const id = req.params.id;

  if (!req.body.comment) {
    return res.status(400).json({ error: "You need to provide a comment" });
  }

  const validID = ObjectId.isValid(id);
  if (!validID) return res.status(404).json({ error: "Id is not valid" });

  const exists = await Post.findById(id);
  if (!exists) return res.status(404).json({ error: "Post not found" });

  let comments = [...exists.comments];
  comments.push({ user: req.user, content: req.body.comment });

  await Post.findByIdAndUpdate(id, { comments }).catch((error) =>
    res.json({ error })
  );

  Post.findById(id).then((result) => res.json({ result }));
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const commentID = req.params.commentID;

  // checking if the id is a valid one
  const validID = ObjectId.isValid(id);
  if (!validID) return res.status(404).json({ error: "Id is not valid" });

  // checking if the id (which is now valid) is in the db
  const exists = await Post.findById(id);
  if (!exists) return res.status(404).json({ error: "Post not found" });

  const comment = exists.comments.filter((item) => item._id == commentID);
  if (!comment.length > 0)
    return res.status(404).json({ error: "Comment not found" });

  const comments = exists.comments.filter((item) => item._id != commentID);

  Post.findByIdAndUpdate(id, { comments })
    .then(res.json({ response: "Comment deleted" }))
    .catch((error) => res.json({ error }));
};

const editPost = async (req, res) => {
  const id = req.params.id;

  if (!(req.body.title && req.body.content)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // checking if the id is a valid one
  const validID = ObjectId.isValid(id);
  if (!validID) return res.status(404).json({ error: "Id is not valid" });

  // checking if the id (which is now valid) is in the db
  const exists = await Post.findById(id);
  if (!exists) return res.status(404).json({ error: "Post not found" });

  // checking if the id of the user requesting is the same as the id in db || admin can edit all
  if (
    req.user.id != exists.user.id &&
    req.user.id != "6337278a070b9b637a5f4cea"
  ) {
    return res.status(404).json({ error: "This post is not yours" });
  }

  Post.findByIdAndUpdate(id, req.body)
    .then(res.json({ response: "Edited" }))
    .catch((error) => res.json({ error }));
};

module.exports = {
  getPost,
  createPost,
  editPost,
  deletePost,
  getDetails,
  createComment,
  deleteComment,
};
