import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ✅ baseURL 설정 추가
const api = axios.create({
  baseURL: "/",  // nginx가 /api, /chat 프록시 해주기 때문에 최상위로 두면 됨
});

function Products() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/api/items").then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>상품 목록</h2>
      <Link to="/products/new">상품 등록</Link>
      {items.map((item) => (
        <div key={item._id}>
          <Link to={`/products/${item._id}`}>{item.title} - {item.price}원</Link>
        </div>
      ))}
    </div>
  );
}

export default Products;
