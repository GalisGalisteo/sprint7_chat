import sanitizedConfig from "../config/config";
import { initDataBase } from "./initDatabase";
import { app } from "./app";
import http from "http";
import { Server } from "socket.io";

initDataBase();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(sanitizedConfig.PORT, () => {
  console.log(`Server is listening on port ${sanitizedConfig.PORT}:
    http://localhost:${sanitizedConfig.PORT}/ 🍄`);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
})