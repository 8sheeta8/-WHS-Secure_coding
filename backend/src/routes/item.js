const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createItem,
  getItems,
  getItem,
  reportItem
} = require("../controllers/productController");
const Item = require("../models/Item");

// 상품 등록
router.post("/", auth, createItem);

// 전체 상품 조회
router.get("/", getItems);

// 특정 상품 상세 조회
router.get("/:id", getItem);

// 특정 사용자 게시물
router.get("/user/:userId", async (req, res) => {
  try {
    const items = await Item.find({ owner: req.params.userId, isHidden: false });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "유저 게시물 조회 실패" });
  }
});

// 내 게시물 조회
router.get("/mine", auth, async (req, res) => {
  try {
    const myItems = await Item.find({ owner: req.user.id });
    res.json(myItems);
  } catch (err) {
    res.status(500).json({ msg: "내 게시물 조회 실패" });
  }
});

// 상품 신고
router.post("/:id/report", auth, reportItem);

module.exports = router;
