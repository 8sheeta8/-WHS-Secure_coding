const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },               // 상품 제목
  description: { type: String },                         // 상품 설명
  price: {
    type: Number,
    required: true,
    min: [0, "가격은 0 이상이어야 합니다."]
  },               // 가격
  imageUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v);
      },
      message: "올바른 이미지 주소를 입력해주세요."
    }
  },                            // 이미지 링크
  isSold: { type: Boolean, default: false },             // 판매 완료 여부
  reportCount: { type: Number, default: 0 },             // 신고 횟수
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },                                                     // 등록한 사용자
  createdAt: { type: Date, default: Date.now },           // 등록 일시
  isHidden: { type: Boolean, default: false } //신고 후 차단
});

module.exports = mongoose.model("Item", itemSchema);
