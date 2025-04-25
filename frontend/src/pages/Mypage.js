import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ baseURL 설정 추가
const api = axios.create({
  baseURL: "/",  // nginx가 /api, /chat 프록시 해주기 때문에 최상위로 두면 됨
});

function MyPage() {
  const [user, setUser] = useState({});
  const [bio, setBio] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    axios
      .get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setBio(res.data.bio || "");
      })
      .catch((err) => console.error("마이페이지 오류:", err.response?.data || err.message));
  }, []);

  const update = () => {
    axios.put("/api/users/me", { bio }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => alert("업데이트 완료"));
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <p>이메일: {typeof user.email === "string" ? user.email : "이메일 없음"}</p>
      <input value={bio} onChange={(e) => setBio(e.target.value)} />
      <button onClick={update}>소개글 수정</button>
    </div>
  );
}

export default MyPage;
