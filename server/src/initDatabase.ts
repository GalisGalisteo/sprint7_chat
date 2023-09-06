import sanitizedConfig from "../config/config";
import { userSchema } from "./infrastructure/models/ChatRoomModel";
import { connectDatabase } from "./infrastructure/databaseConnection";

export let chatDocument: any

export const initDataBase = async () => {
    const databaseConnection = connectDatabase(sanitizedConfig.MONGO_URI, sanitizedConfig.DATABASE);
    chatDocument = databaseConnection.model("User", userSchema);

    return chatDocument;
  }