const { WebSocketServer, WebSocket } = require("ws");

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`Servidor de sockets escuchando en el puerto ${PORT}...`);

const reactionsMap = new Map();

wss.on("connection", (ws) => {
  ws.username = null;

  ws.on("message", (data) => {
    let payload;
    try {
      payload = JSON.parse(data.toString());
    } catch {
      return;
    }

    if (payload.type === "join") {
      ws.username = payload.username || "Anónimo";
      broadcast({
        type: "system",
        text: `🟢 ${ws.username} se conectó.`,
      });
    } else if (payload.type === "chat_message") {
      const messageId =
        Date.now().toString() + Math.random().toString(36).slice(2, 6);
      reactionsMap.set(messageId, {});

      broadcast({
        type: "new_message",
        id: messageId,
        sender: payload.sender || "Anónimo",
        text: payload.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        reactions: {},
      });
    } else if (payload.type === "reaction") {
      const { messageId, emoji, user } = payload;
      if (!reactionsMap.has(messageId)) return;

      const msgReactions = reactionsMap.get(messageId);
      if (!msgReactions[emoji]) {
        msgReactions[emoji] = [];
      }

      const userIndex = msgReactions[emoji].indexOf(user);
      if (userIndex > -1) {
        msgReactions[emoji].splice(userIndex, 1);
        if (msgReactions[emoji].length === 0) delete msgReactions[emoji];
      } else {
        msgReactions[emoji].push(user);
      }

      broadcast({
        type: "reaction_update",
        messageId,
        reactions: msgReactions,
      });
    }
  });

  ws.on("close", () => {
    if (ws.username) {
      broadcast({
        type: "system",
        text: `🔴 ${ws.username} se desconectó.`,
      });
    }
  });
});

function broadcast(obj) {
  const jsonStr = JSON.stringify(obj);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonStr);
    }
  });
}
