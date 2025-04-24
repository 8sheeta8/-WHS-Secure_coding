const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  bio: String,
  role: { type: String, default: "user" },
  banned: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
