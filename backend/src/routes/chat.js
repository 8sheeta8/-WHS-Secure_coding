const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ChatRoom = require("../models/ChatRoom");

// 채팅방 시작
router.post("/start", auth, async (req, res) => {
  const { userId } = req.body;
  let room = await ChatRoom.findOne({ users: { $all: [req.user.id, userId] } });
  if (!room) {
    room = new ChatRoom({ users: [req.user.id, userId], messages: [] });
    await room.save();
  }
  res.json(room);
});

// 메시지 전송
router.post("/:roomId", auth, async (req, res) => {
  const room = await ChatRoom.findById(req.params.roomId);
  room.messages.push({ sender: req.user.id, text: req.body.text });
  await room.save();
  res.json({ msg: "전송 완료" });
});

// 메시지 조회
router.get("/:roomId", auth, async (req, res) => {
  const room = await ChatRoom.findById(req.params.roomId).populate("messages.sender", "name");
  res.json(room.messages);
});



router.post("/send", (req, res) => {
  const { sender, content } = req.body;
  // 메시지를 DB에 저장하거나 broadcast
  res.json({ message: "메시지 전송됨" });
});

module.exports = router;
