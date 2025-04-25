require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // ✅ bcrypt 제거 → 평문 저장
    const user = new User({ email, password, name });
    await user.save();
    res.json({ msg: "회원가입 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "회원가입 실패" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("로그인 시도:", email, password);

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "이메일 또는 비밀번호가 잘못되었습니다." });

    // ✅ bcrypt 제거하고 문자열 비교
    const isMatch = password === user.password;
    console.log("비밀번호 일치 여부:", isMatch);
    if (!isMatch) return res.status(401).json({ msg: "이메일 또는 비밀번호가 잘못되었습니다." });


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    console.error("로그인 처리 중 에러:", err.message);
    res.status(500).json({ msg: "로그인 처리 중 서버 오류" });
  }
});


// 로그인 상태 확인
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.bio = req.body.bio || "";
  await user.save();
  res.json({ message: "소개글이 수정되었습니다." });
});

module.exports = router;
