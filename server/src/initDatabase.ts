import { Model } from "mongoose";
import sanitizedConfig from "../config/config";
import { UserInterface } from "./application/UserInterface";
import { UserService } from "./application/UserService";
import { IRoomMongoDB, IUserMongoDB } from "./domain/interfaces";
import { userSchema } from "./infrastructure/models/userModel";
import { connectDatabase } from "./infrastructure/mongoDBConnection";
import { RoomMongoDBManager, UserMongoDBManager } from "./infrastructure/mongoDBManager";
import { roomSchema } from "./infrastructure/models/roomModel";
import { RoomInterface } from "./application/RoomInterface";
import { RoomService } from "./application/RoomService";

export let userDocument: Model<IUserMongoDB>;
export let roomDocument: Model<IRoomMongoDB>;
export let userService: UserInterface;
export let roomService: RoomInterface;

export const initDataBase = async () => {
    const databaseConnection = connectDatabase(sanitizedConfig.MONGO_URI, sanitizedConfig.DATABASE);
    userDocument = databaseConnection.model<IUserMongoDB>("User", userSchema);
    roomDocument = databaseConnection.model<IRoomMongoDB>("Room", roomSchema);
    const userMongoDBManager = new UserMongoDBManager(userDocument);
    const roomMongoDBManager = new RoomMongoDBManager(roomDocument);
    userService = new UserService(userMongoDBManager);
    roomService = new RoomService(roomMongoDBManager);
    return { userDocument, userService, roomDocument, roomService };
}