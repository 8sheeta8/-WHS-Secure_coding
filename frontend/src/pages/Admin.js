import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/reports", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setReports(res.data));
  }, []);

  const banUser = (id) => {
    axios.post(`/api/admin/ban/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => alert("유저 차단됨"));
  };

  const deleteProduct = (id) => {
    axios.delete(`/api/admin/product/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => alert("상품 삭제됨"));
  };

  return (
    <div>
      <h2>관리자 신고 목록</h2>
      {reports.map((r) => (
        <div key={r._id}>
          <p>{r.type} - {r.reason}</p>
          {r.type === "user" && <button onClick={() => banUser(r.targetId)}>유저 차단</button>}
          {r.type === "product" && <button onClick={() => deleteProduct(r.targetId)}>상품 삭제</button>}
        </div>
      ))}
    </div>
  );
}

export default Admin;
