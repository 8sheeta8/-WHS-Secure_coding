const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, name });
  await user.save();
  res.json({ msg: "User created" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "No user" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { bio, password } = req.body;
  const data = {};
  if (bio) data.bio = bio;
  if (password) data.password = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(req.user.id, data);
  res.json({ msg: "Updated" });
};
