import React, { useState, useEffect } from "react";

function Chat() {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // ✅ WebSocket 연결 (nginx proxy 경유)
    const socket = new WebSocket("ws://localhost/chat/");
    
    socket.onopen = () => {
      console.log("✅ WebSocket 연결됨");
    };

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setChat((prev) => [...prev, data]);
      } catch {
        console.error("⚠️ JSON 파싱 실패:", e.data);
      }
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket 에러", err);
    };

    socket.onclose = () => {
      console.warn("🔌 WebSocket 연결 종료됨");
    };

    setWs(socket);

    // 컴포넌트 언마운트 시 소켓 닫기
    return () => socket.close();
  }, []);

  const send = () => {
    if (!msg.trim() || !ws || ws.readyState !== WebSocket.OPEN) {
      alert("메시지를 보낼 수 없습니다. 서버와 연결되지 않았습니다.");
      return;
    }

    const data = {
      user: "익명",
      message: msg,
      time: new Date().toISOString(),
    };

    ws.send(JSON.stringify(data));
    setMsg(""); // 전송 후 입력창 비우기
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>💬 채팅방</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          background: "#f9f9f9",
          marginBottom: "10px"
        }}
      >
        {chat.map((m, i) => (
          <div key={i}>
            <strong>{m.user}</strong>: {m.message}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          style={{ flex: 1, padding: "8px" }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={send} style={{ padding: "8px 16px" }}>
          보내기
        </button>
      </div>
    </div>
  );
}

export default Chat;
