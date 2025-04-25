const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 4000 });

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  const roomId = req.url.split("/").pop(); // /chat/roomId

  if (!wss.rooms) wss.rooms = {};
  if (!wss.rooms[roomId]) wss.rooms[roomId] = [];

  wss.rooms[roomId].push(ws);

  ws.on("message", (msg) => {
    const parsed = JSON.parse(msg);
    // 해당 방에만 메시지 브로드캐스트
    wss.rooms[roomId].forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsed));
      }
    });
  });
});