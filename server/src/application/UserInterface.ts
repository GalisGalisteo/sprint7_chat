import { Message } from "../domain/Message";
import { User } from "../domain/User";


export interface UserInterface {
    createUser(userDetails: User): Promise<string>;
    findUserByEmail(userEmail: string): Promise<User | null>;
    findUserById(userId: string): Promise<User>;
    createMessage(text: string, user_id: string): Promise<Message>;
    getMessages(): Promise<Message[]>

}