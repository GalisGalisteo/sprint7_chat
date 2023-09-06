import { Message } from "./Message";

export interface IMessage {
    text: string;
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
}

export interface IUserMongoDB {
    _id: string;
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
  };

export class User {
    readonly email: string;
    readonly name: string;
    readonly password: string;
    public messages: IMessage[];
//    private _messages: IMessage[];
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

    // public get messages() {
    //     return this._messages;
    // }
}