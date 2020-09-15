const { Schema, model, Types } = require("mongoose");

const blogPostSchema = Schema(
  {
    title: String,
    tags: [String]
  },
  { versionKey: false }
);

const BlogPost = model("BlogPost", blogPostSchema);

module.exports = BlogPost;
