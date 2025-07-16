const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // o restringe si prefieres
    methods: ["GET", "POST"],
  },
});

// Socket.IO conexión
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Endpoint para que Spring Boot envíe incidentes nuevos
app.post("/notify-incident", (req, res) => {
  const incident = req.body;
  console.log("Nuevo incidente recibido:", incident);

  io.emit("new-incident", incident); // Emitir a todos los clientes

  res.status(200).send({ message: "Incidente emitido correctamente" });
});

server.listen(3000, () => {
  console.log("Socket.IO server escuchando en http://localhost:3000");
});
