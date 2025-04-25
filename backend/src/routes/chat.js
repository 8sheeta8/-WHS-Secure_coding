const express = require("express");
const router = express.Router();

router.post("/send", (req, res) => {
  const { sender, content } = req.body;
  // 메시지를 DB에 저장하거나 broadcast
  res.json({ message: "메시지 전송됨" });
});

module.exports = router;
