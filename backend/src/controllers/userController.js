const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // ⛔ bcrypt 제거: 암호화 없이 평문 저장
    const user = new User({ email, password, name });
    await user.save();
    res.json({ msg: "회원가입 성공" });
  } catch (err) {
    console.error("회원가입 에러:", err);
    res.status(500).json({ msg: "회원가입 실패" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🟨 로그인 시도:", email, password);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "이메일 또는 비밀번호가 잘못되었습니다." });
  }

  // ⛔ bcrypt 제거: 평문 비밀번호 비교
  if (user.password !== password) {
    console.log("🟥 비밀번호 불일치");
    return res.status(401).json({ msg: "이메일 또는 비밀번호가 잘못되었습니다." });
  }

  console.log("✅ 비밀번호 일치");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};


exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { bio, password } = req.body;
  const data = {};
  if (bio) data.bio = bio;
  if (password) data.password = password; // 🔒 암호화 안함
  await User.findByIdAndUpdate(req.user.id, data);
  res.json({ msg: "업데이트 완료" });
};


