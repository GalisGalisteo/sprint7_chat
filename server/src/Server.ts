import sanitizedConfig from "../config/config";
import { io, server } from "./app";
import { initDataBase } from "./initDatabase";

initDataBase();

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(sanitizedConfig.PORT, () => {
    console.log(`Server is listening on port ${sanitizedConfig.PORT}! 🍄 `);
});