import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>중고거래 플랫폼</h1>
      <nav>
        <Link to="/login">로그인</Link> | <Link to="/register">회원가입</Link> |
        <Link to="/products">상품목록</Link> | <Link to="/mypage">마이페이지</Link> |
        <Link to="/chat">채팅</Link>
      </nav>
    </div>
  );
}

export default Home;
