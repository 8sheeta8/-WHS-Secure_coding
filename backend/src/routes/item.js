const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createItem,
  getItems,
  getItem,
  reportItem
} = require("../controllers/productController");

// 상품 등록
router.post("/", auth, createItem);

// 전체 상품 조회
router.get("/", getItems);

// 특정 상품 상세 조회
router.get("/:id", getItem);

// 상품 신고
router.post("/:id/report", auth, reportItem);

module.exports = router;
