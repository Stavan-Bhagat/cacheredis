const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String } // Add imageUrl field to store Cloudinary image URL
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
