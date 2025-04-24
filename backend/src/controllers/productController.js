const Product = require("../models/Product");
const Report = require("../models/Report");

exports.createItem = async (req, res) => {
  const { title, description, price } = req.body;
  const item = new Product({ title, description, price, owner: req.user.id });
  await item.save();
  res.json(item);
};

exports.getItems = async (req, res) => {
  const items = await Product.find().populate("owner", "name");
  res.json(items);
};

exports.getItem = async (req, res) => {
  const item = await Product.findById(req.params.id).populate("owner", "name");
  res.json(item);
};

exports.reportItem = async (req, res) => {
  const report = new Report({
    type: "product",
    targetId: req.params.id,
    reason: req.body.reason,
    reporter: req.user.id
  });
  await report.save();
  res.json({ msg: "Reported" });
};
