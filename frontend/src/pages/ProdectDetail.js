import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [reason, setReason] = useState("");

  useEffect(() => {
    axios.get(`/api/items/${id}`).then(res => setItem(res.data));
  }, [id]);

  const report = () => {
    axios.post(`/api/items/${id}/report`, { reason }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => alert("신고 완료"));
  };

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>가격: {item.price}원</p>
      <textarea placeholder="신고 사유" value={reason} onChange={(e) => setReason(e.target.value)} />
      <button onClick={report}>신고</button>
    </div>
  );
}

export default ProductDetail;
