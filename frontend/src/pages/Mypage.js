import React, { useEffect, useState } from "react";
import axios from "axios";

function MyPage() {
  const [user, setUser] = useState({});
  const [bio, setBio] = useState("");

  useEffect(() => {
    axios.get("/api/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setUser(res.data);
      setBio(res.data.bio || "");
    });
  }, []);

  const update = () => {
    axios.put("/api/users/me", { bio }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => alert("업데이트 완료"));
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <p>이메일: {user.email}</p>
      <input value={bio} onChange={(e) => setBio(e.target.value)} />
      <button onClick={update}>소개글 수정</button>
    </div>
  );
}

export default MyPage;
