const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  type: String, // "user" or "product"
  targetId: mongoose.Schema.Types.ObjectId,
  reason: String,
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);
