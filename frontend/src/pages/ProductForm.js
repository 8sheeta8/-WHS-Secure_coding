import React, { useState } from "react";
import axios from "axios";

// ✅ baseURL 설정 추가
const api = axios.create({
  baseURL: "/",  // nginx가 /api, /chat 프록시 해주기 때문에 최상위로 두면 됨
});


function ProductForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/items",
        {
          title,
          description: desc,
          price,
          bankAccount 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("상품 등록 성공");
      window.location.href = "/products";
    } catch (err) {
      alert("상품 등록 실패");
      console.error("등록 오류:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>상품 등록</h2>
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="설명"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        placeholder="가격"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        value={bankAccount}
        onChange={(e) => setBankAccount(e.target.value)}
        placeholder="송금 계좌"
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default ProductForm;
