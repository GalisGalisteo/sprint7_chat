import { Message } from "../domain/Message";
import { User } from "../domain/User";
import { UserInterface } from "./UserInterface";


export class UserService {
    userInterface: UserInterface;
    constructor(userInterface: UserInterface) {
        this.userInterface = userInterface;
    }

    createUser(userDetails: User): Promise<string> {
        return this.userInterface.createUser(userDetails);
    }

    findUserByEmail(userEmail: string): Promise<User> {
        return this.userInterface.findUserByEmail(userEmail);
    }

    createMessage(text: string, user_id: string): Promise<Message> {
        return this.userInterface.createMessage(text, user_id)
    }

    getMessages(): Promise<Message[]> {
        return this.userInterface.getMessages()
    }
}