const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filename: String,
  contentType: String,
  image: Buffer,
});

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
