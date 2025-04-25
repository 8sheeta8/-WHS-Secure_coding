import React, { useState } from "react";
import axios from "axios";

// ✅ baseURL 설정 추가
const api = axios.create({
  baseURL: "/",  // nginx가 /api, /chat 프록시 해주기 때문에 최상위로 두면 됨
});

function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/users/register", {
        email,
        password: pw,
        name,
      });
      alert("회원가입 성공");
      console.log("회원가입 성공:", res.data);
    } catch (err) {
      alert("회원가입 실패");
      console.error("회원가입 에러:", err.response?.data || err.message);
    }
  };
  

  return (
    <form onSubmit={submit}>
      <h2>회원가입</h2>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
      <button>회원가입</button>
    </form>
  );
}

export default Register;
