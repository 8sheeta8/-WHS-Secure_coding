import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
