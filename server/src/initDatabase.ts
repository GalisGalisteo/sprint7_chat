import sanitizedConfig from "../config/config";
import { RoomSchema } from "./infrastructure/models/ChatRoomModel";
import { connectDatabase } from "./infrastructure/databaseConnection";
import { Connection } from "mongoose";


export let chatRoomDocument: any

export const initDataBase = async () => {
    const databaseConnection = connectDatabase(sanitizedConfig.MONGO_URI, sanitizedConfig.DATABASE);
    chatRoomDocument = databaseConnection.model("ChatRoom", RoomSchema);

    return { chatRoomDocument };
  }