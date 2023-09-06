import { Message } from "./Message";

export interface IMessage {
    text: string;
}

export interface IUser {
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
}

export class User {
    readonly email: string;
    readonly name: string;
    readonly password: string;
    private _messages: IMessage[];

    constructor(
        email: string,
        name: string,
        password: string,
        messages: IMessage[]
    ) {
        this.email = email;
        this.name = name;
        this.password = password;
        this._messages = messages;
    }

    public addNewMessage(message: Message) {
        this._messages.push(message);
    }

    public get messages() {
        return this._messages;
    }
}