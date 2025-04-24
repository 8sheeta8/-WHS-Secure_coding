const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 4000 });

server.on("connection", socket => {
  socket.on("message", message => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log("WebSocket server running on port 4000");
