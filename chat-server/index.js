const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 4000 });

server.on("connection", socket => {
  socket.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      console.log(`[채팅 수신] ${data.user}: ${data.message}`);
      io.emit("message", `${data.user}: ${data.message}`);
    } catch {
      console.log("잘못된 메시지 형식:", msg);
    }
  });
  
});

console.log("WebSocket server running on port 4000");
