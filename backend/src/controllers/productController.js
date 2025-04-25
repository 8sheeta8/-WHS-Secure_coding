const Item = require("../models/Item");
const Report = require("../models/Report");

exports.getItems = async (req, res) => {
  try {
    const q = req.query.query || "";
    const items = await Item.find({
      title: { $regex: q, $options: "i" },
      isHidden: false
    }).populate("owner", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "상품 조회 실패" });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, isHidden: false }).populate("owner", "name");
    if (!item) return res.status(404).json({ msg: "상품을 찾을 수 없습니다." });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "서버 오류" });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, description, price, bankAccount } = req.body;
    const item = new Item({ title, description, price, bankAccount, owner: req.user.id });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "상품 등록 실패" });
  }
};

exports.reportItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "상품이 존재하지 않습니다." });

    item.reportCount += 1;
    item.isHidden = true;
    await item.save();

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

