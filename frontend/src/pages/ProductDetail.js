import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// ✅ baseURL 설정 추가
const api = axios.create({
  baseURL: "/",  // nginx가 /api, /chat 프록시 해주기 때문에 최상위로 두면 됨
});

function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [reason, setReason] = useState("");

  useEffect(() => {
    axios.get(`/api/items/${id}`).then(res => setItem(res.data));
  }, [id]);

  const report = async () => {
    await axios.post(`/items/${itemId}/report`, { reason });
    alert("신고 완료");
  };
  

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>송금 계좌: {item.bankAccount || "미입력"}</p>
      <p>가격: {item.price}원</p>
      <textarea placeholder="신고 사유" value={reason} onChange={(e) => setReason(e.target.value)} />
      <button onClick={report}>신고</button>
    </div>
  );
}

export default ProductDetail;
