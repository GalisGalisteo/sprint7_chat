import { User } from "./User";

export class Room {
    readonly name: string;
    public userCreatorId: string;
    public users: User[];
    readonly id?: string;

    constructor(
        name: string,
        userCreatorId: string,
        users: User[],
        id?: string
    ) {
        this.name = name;
        this.userCreatorId = userCreatorId;
        this.users = users;
        this.id = id;
    }

    public addNewUser(user: User) {
        this.users.push(user);
    }
}