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
    user: {
      id: {
        required: true,
        type: String,
      },
      name: {
        required: true,
        type: String,
      },
    },
    comments: [
      {
        user: {
          id: {
            required: false,
            type: String,
          },
          name: {
            required: false,
            type: String,
          },
        },
        content: {
          required: false,
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
