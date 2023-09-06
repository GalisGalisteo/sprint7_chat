import { UserInterface } from "../application/UserInterface";
import { User } from "../domain/User";
import { chatDocument } from "../initDatabase";


export class UserMongoDBManager implements UserInterface {
    async createUser(user: User): Promise<string> {
        const nameEmailAlreadyExists = await chatDocument.findOne({
            $or: [
                { email: user.email },
                { name: user.name }
            ]
        })
        if (nameEmailAlreadyExists) {
            throw new Error("NameEmailConflictError");
        }
        const newUser = {
            email: user.email,
            name: user.name,
            password: user.password,
            messages: []
        }
        const userDB = await chatDocument.create(newUser);
        if (!userDB) {
            throw new Error("Can't create new user")
        }
        return userDB.id;
    }
}