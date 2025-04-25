const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  bio: String,
  role: { type: String, default: "user" },
  banned: { type: Boolean, default: false },
  
});

// 비밀번호 자동 해싱 제거 (개발용)
userSchema.pre("save", function (next) {
  next(); // 아무것도 하지 않음
});


module.exports = mongoose.model("User", userSchema);
