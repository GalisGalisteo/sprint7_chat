import { Message } from "./Message";

export interface IMessage {
    id: string;
    text: string;
}

export class User {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly password: string;
    private _messages: IMessage[];

    constructor(
        id: string,
        email: string,
        name: string,
        password: string,
        messages: IMessage[]
    ) {
        this.id = id;
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