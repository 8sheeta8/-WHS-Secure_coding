import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const nav = useNavigate();

  const submit = () => {
    axios.post("/api/items", {
      title, description: desc, price
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => nav("/products"));
  };

  return (
    <div>
      <h2>상품 등록</h2>
      <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="설명" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="number" placeholder="가격" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={submit}>등록</button>
    </div>
  );
}

export default ProductForm;
