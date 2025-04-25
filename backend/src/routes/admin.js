const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const User = require("../models/User");
const Item = require("../models/Item");



// 전체 유저 조회
router.get("/users", auth, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 상품 전체 조회
router.get("/items", auth, isAdmin, async (req, res) => {
  const items = await Item.find().populate("owner", "email");
  res.json(items);
});

// 상품 숨김 처리
router.put("/items/:id/hide", auth, isAdmin, async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, { isHidden: true });
  res.json({ msg: "숨김 처리 완료" });
});

// 상품 삭제
router.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "삭제됨" });
  });
  
  // 유저 정지
  router.put("/users/:id/ban", async (req, res) => {
    const user = await User.findById(req.params.id);
    user.banned = true;
    await user.save();
    res.json({ msg: "정지됨" });
  });

  module.exports = router;