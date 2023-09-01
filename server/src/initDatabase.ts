import sanitizedConfig from "../config/config";
import { RoomSchema } from "./infrastructure/models/ChatRoomModel";
import { connectDatabase } from "./infrastructure/mongoDBconnection";

export const initDataBase = async () => {
    const mongoDbConnection = connectDatabase(sanitizedConfig.MONGO_URI, sanitizedConfig.DATABASE);
    const mongoPlayerDocument = mongoDbConnection.model("ChatRoom", RoomSchema);

    return { mongoDbConnection, mongoPlayerDocument };
  }