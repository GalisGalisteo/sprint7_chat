import { Message } from "../domain/Message";
import { User } from "../domain/User";
import { IUserMongoDB } from "../domain/interfaces";
import { UserInterface } from "./UserInterface";


export class UserService {
    userInterface: UserInterface;
    constructor(userInterface: UserInterface) {
        this.userInterface = userInterface;
    }

    createUser(userDetails: User): Promise<IUserMongoDB> {
        return this.userInterface.createUser(userDetails);
    }

    findUserByEmail(userEmail: string): Promise<User | null> {
        return this.userInterface.findUserByEmail(userEmail);
    }

    findUserById(userId: string): Promise<User> {
        return this.userInterface.findUserById(userId);
    }

    createMessage(text: string, user_id: string): Promise<Message> {
        return this.userInterface.createMessage(text, user_id)
    }

    getMessages(): Promise<Message[]> {
        return this.userInterface.getMessages()
    }
}