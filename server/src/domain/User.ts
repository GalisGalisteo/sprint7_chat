import { Message } from "./Message";
import { IMessage } from "./interfaces";

export class User {
    readonly email: string;
    readonly name: string;
    readonly password: string;
    public messages: IMessage[];
    readonly id?: string;

    constructor(
        email: string,
        name: string,
        password: string,
        messages: IMessage[],
        id?: string
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.messages = messages;
    }

    public addNewMessage(message: Message) {
        this.messages.push(message);
    }
}