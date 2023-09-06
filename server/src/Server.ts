import sanitizedConfig from "../config/config";
import { app } from "./app";
import { chatDocument, initDataBase } from "./initDatabase";

initDataBase();

// const server = require("http").Server(app);
// const io = require("socket.io")(server);

// io.on("connection", (socket: any) => {
//     console.log("Alguien se ha conectado con Sockets");

//     socket.on('new-room', (room: any) => {
//         const newRoom = new chatDocument({
//             name: room.name
//         })

//         newRoom.save((err: any) => {
//             if (err) {
//                 console.error('Error saving message:', err);
//             } else {
//                 console.log('Message saved to MongoDB:', newRoom);
//             }
//         });

//         io.emit('new-room', room)
//     })

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//       });
// })

app.listen(sanitizedConfig.PORT, () => {
    console.log(`Server is listening on port ${sanitizedConfig.PORT}! 🍄 `);
});