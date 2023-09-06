import sanitizedConfig from "../config/config";
import { UserInterface } from "./application/UserInterface";
import { UserService } from "./application/UserService";
import { userSchema } from "./infrastructure/models/chatModel";
import { connectDatabase } from "./infrastructure/mongoDBConnection";
import { UserMongoDBManager } from "./infrastructure/mongoDBManager";

export let chatDocument: any;
export let userService: UserInterface;

export const initDataBase = async () => {
    const databaseConnection = connectDatabase(sanitizedConfig.MONGO_URI, sanitizedConfig.DATABASE);
    chatDocument = databaseConnection.model("User", userSchema);
    const userMongoDBManager = new UserMongoDBManager();
    userService = new UserService(userMongoDBManager);
    return { chatDocument, userService };
}