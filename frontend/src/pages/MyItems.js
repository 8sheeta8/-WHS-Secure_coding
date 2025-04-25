import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ baseURL 설정 추가
const api = axios.create({
    baseURL: "/",  // nginx가 /api, /chat 프록시 해주기 때문에 최상위로 두면 됨
  });
  

function MyItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/api/items/mine", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>내 게시물</h2>
      {items.map((i) => (
        <div key={i._id}>
          <p>{i.title} - {i.price}원</p>
        </div>
      ))}
    </div>
  );
}

export default MyItems;
