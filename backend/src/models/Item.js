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
  bankAccount: { type: String, default: "" },
  isSold: { type: Boolean, default: false },
  reportCount: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Item", itemSchema);
