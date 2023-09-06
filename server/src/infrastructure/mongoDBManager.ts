import { Model } from "mongoose";
import { UserInterface } from "../application/UserInterface";
import { Message } from "../domain/Message";
import { IUserMongoDB, User } from "../domain/User";

export class UserMongoDBManager implements UserInterface {
    private chatDocument: Model<IUserMongoDB>
    constructor(chatDocument: Model<IUserMongoDB>) {
        this.chatDocument = chatDocument
    }
    async createUser(user: User): Promise<string> {
        const nameEmailAlreadyExists = await this.chatDocument.findOne({
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
        const userDB = await this.chatDocument.create(newUser);
        if (!userDB) {
            throw new Error("Can't create new user")
        }
        return userDB.id;
    }

    async findUserByEmail(userEmail: string): Promise<User> {
        const userDetails = await this.chatDocument.findOne({ email: userEmail });
        if (!userDetails) {
            throw new Error("EmailNotExists");
        }
        const { name, email, password, messages, id } = userDetails;
        return new User(email, name, password, messages, id)
    }

    async findUserById(user_id: string): Promise<User> {
        const userDetails = await this.chatDocument.findById(user_id);
        if (!userDetails) {
            throw new Error("PlayerNotFound");
        }
        const { name, email, password, messages, id } = userDetails;
        return new User(email, name, password, messages, id)
    }

    async createMessage(text: string, user_id: string): Promise<Message> {
        const user = await this.findUserById(user_id);
        const message = new Message(text);

        await user.addNewMessage(message);


        console.log("USER_AFTER_ADDED: ", user);

        const response = await this.chatDocument.replaceOne(
            { _id: { $eq: user.id } },
            user
        );

        console.log("RESPONSE: ", response);

        if (response.modifiedCount === 1) {
            const lastMessage = user.messages[user.messages.length - 1];
            return lastMessage;
        }
        throw new Error("AddingMessageError");
    }

}