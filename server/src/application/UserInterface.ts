import { User } from "../domain/User";


export interface UserInterface {
    createUser(userDetails: User): Promise<string>;
}