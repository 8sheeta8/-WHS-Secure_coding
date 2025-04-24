import React, { useState, useEffect } from "react";

function Chat() {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost/chat/");
    socket.onmessage = (e) => {
      setChat((prev) => [...prev, e.data]);
    };
    setWs(socket);
  }, []);

  const send = () => {
    ws.send(msg);
    setMsg("");
  };

  return (
    <div>
      <h2>채팅방</h2>
      {chat.map((m, i) => <div key={i}>{m}</div>)}
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>보내기</button>
    </div>
  );
}

export default Chat;
