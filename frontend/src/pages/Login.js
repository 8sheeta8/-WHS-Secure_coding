import React, { useState } from "react";
import axios from "axios";

// ✅ baseURL 설정 추가
const api = axios.create({
  baseURL: "/",  // nginx가 /api, /chat 프록시 해주기 때문에 최상위로 두면 됨
});

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password: pw,
      });

      const token = res.data.token;
      if (!token) {
        throw new Error("서버에서 토큰을 받지 못했습니다");
      }

      localStorage.setItem("token", token);
      alert("로그인 성공");
      window.location.href = "/"; // 메인 페이지로 이동
    } catch (err) {
      alert("로그인 실패");
      console.error("로그인 에러:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;
