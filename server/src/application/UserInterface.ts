import { Message } from "../domain/Message";
import { User } from "../domain/User";
import { IUserMongoDB } from "../domain/interfaces";


export interface UserInterface {
    createUser(userDetails: User): Promise<IUserMongoDB>;
    findUserByEmail(userEmail: string): Promise<User | null>;
    findUserById(userId: string): Promise<User>;
    createMessage(text: string, user_id: string): Promise<Message>;
    getMessages(): Promise<Message[]>

}