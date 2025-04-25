import React, { useState, useEffect } from "react";

function Chat() {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost/chat/");
    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);  // ✅ 문자열이 아닌 JSON 파싱
        setChat((prev) => [...prev, `${data.user}: ${data.message}`]);
      } catch (err) {
        console.error("메시지 파싱 오류:", err);
      }
    };
    socket.onopen = () => console.log("✅ WebSocket 연결됨");
    socket.onerror = (err) => console.error("❌ WebSocket 에러", err);
    socket.onclose = () => console.warn("⚠️ WebSocket 연결 종료됨");

    setWs(socket);

    return () => socket.close(); // 컴포넌트 언마운트 시 연결 종료
  }, []);

  const send = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert("WebSocket 연결되지 않았습니다.");
      return;
    }

    const data = { user: "익명", message: msg };
    ws.send(JSON.stringify(data));
    setMsg(""); // 전송 후 입력창 비우기
  };

  return (
    <div>
      <h2>채팅방</h2>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {chat.map((m, i) => (
          <div key={i}>
            <strong>{m.user}</strong>: {m.message}
          </div>
        ))}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>보내기</button>
    </div>
  );
}

export default Chat;
