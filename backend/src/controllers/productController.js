const Report = require("../models/Report");
const Item = require("../models/Item");

// [POST] 상품 등록
exports.createItem = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const item = new Item({
      title,
      description,
      price,
      owner: req.user.id,
    });
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "상품 등록 실패" });
  }
};

// [GET] 전체 상품 조회
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// [GET] 특정 상품 상세 조회
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("owner", "name");
    if (!item) return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// [POST] 상품 신고
exports.reportItem = async (req, res) => {
  try {
    const report = new Report({
      type: "product",
      targetId: req.params.id,
      reason: req.body.reason,
      reporter: req.user.id,
    });
    await report.save();
    res.json({ msg: "신고가 접수되었습니다." });
  } catch (err) {
    res.status(500).json({ message: "신고 실패" });
  }
};
