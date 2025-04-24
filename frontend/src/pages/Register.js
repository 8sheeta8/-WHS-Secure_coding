import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/api/users/register", { email, password: pw, name });
    alert("회원가입 성공");
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
