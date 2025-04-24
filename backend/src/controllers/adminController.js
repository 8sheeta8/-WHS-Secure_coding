const User = require("../models/User");
const Product = require("../models/Product");
const Report = require("../models/Report");

exports.getReports = async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const reports = await Report.find().populate("reporter", "email");
  res.json(reports);
};

exports.banUser = async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  await User.findByIdAndUpdate(req.params.id, { banned: true });
  res.json({ msg: "User banned" });
};

exports.deleteProduct = async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Product deleted" });
};
