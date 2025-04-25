const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const chatRoomSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [messageSchema]
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
