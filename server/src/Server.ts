import sanitizedConfig from "../config/config";
import { initDataBase } from "./initDatabase";
import { app } from "./app";
import http from "http";
import { Server as WebSocketServer, WebSocket } from "ws";

initDataBase();

const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({ server: httpServer })

httpServer.listen(sanitizedConfig.PORT, () => {
    console.log(`Server is listening on port ${sanitizedConfig.PORT}:
    http://localhost:${sanitizedConfig.PORT}/ 🍄`);
});

export const connectedClients = new Set<WebSocket>();

wsServer.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        connectedClients.delete(socket);
    });

    connectedClients.add(socket);

});