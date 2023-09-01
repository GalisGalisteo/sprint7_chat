import { IMessage, User } from "./User";

export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
}

export class Room {
    readonly id: string;
    readonly name: string;
    private _users: IUser[]

    constructor(
        id: string,
        name: string,
        users: IUser[]
    ) {
        this.id = id;
        this.name = name;
        this._users = users;
    }

    public addNewUser(user: User) {
        this._users.push(user);
    }

    public get users() {
        return this._users;
    }
}