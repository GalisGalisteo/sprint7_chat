import { User } from "./User";

export class Room {
    readonly name: string;
    public userCreator: User;
    public users: User[];
    readonly id?: string;

    constructor(
        name: string,
        userCreator: User,
        users: User[],
        id?: string
    ) {
        this.name = name;
        this.userCreator = userCreator;
        this.users = users;
        this.id = id;
    }

    public addNewUser(user: User) {
        this.users.push(user);
    }
}