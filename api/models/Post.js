const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      max: 255,
    },
    content: {
      required: true,
      type: String,
    },
    likes: {
      required: true,
      type: Number,
    },
    userID: {
      required: true,
      type: String,
    },
    comments: {
      userID: {
        required: false,
        type: String,
      },
      body: {
        required: false,
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
