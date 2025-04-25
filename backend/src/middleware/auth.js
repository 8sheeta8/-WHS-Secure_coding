const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1️⃣ Authorization 헤더 없음
  if (!authHeader) {
    return res.status(401).json({ msg: "인증 토큰이 없습니다. 로그인이 필요합니다." });
  }

  // 2️⃣ 형식이 Bearer <token> 이 아님
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(400).json({ msg: "잘못된 인증 형식입니다. Bearer 토큰을 사용하세요." });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 이후 라우터에서 req.user 사용 가능
    next();
  } catch (err) {
    console.error("JWT 인증 실패:", err.message); // 서버 로그 확인용
    return res.status(403).json({ msg: "유효하지 않은 토큰입니다. 다시 로그인해주세요." });
  }
}

module.exports = auth;
