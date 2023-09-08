import { Model } from "mongoose";
import { UserInterface } from "../application/UserInterface";
import { Message } from "../domain/Message";
import { IUserMongoDB } from "../domain/interfaces";
import { User } from "../domain/User";

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
            if (nameEmailAlreadyExists.email === user.email)
                throw new Error("EmailConflictError");
            if (nameEmailAlreadyExists.name === user.name)
                throw new Error("NameConflictError");
        }
        const newUser = {
            email: user.email,
            name: user.name,
            password: user.password,
            messages: []
        }
        try {
            const userDB = await this.chatDocument.create(newUser);
            return userDB.id;
        } catch (err) {
            throw err;
        }
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
            throw new Error("UserNotFound");
        }
        const { name, email, password, messages, id } = userDetails;
        return new User(email, name, password, messages, id)
    }

    async createMessage(text: string, user_id: string): Promise<Message> {
        const user = await this.findUserById(user_id);
        const message = await new Message(text, user.name);
        console.log(message)
        await user.addNewMessage(message);
        console.log("USER", user)
        const response = await this.chatDocument.replaceOne(
            { _id: { $eq: user.id } },
            user
        );
        if (response.modifiedCount === 1) {
            const lastMessage = user.messages[user.messages.length - 1];
            console.log("LASTMESSAGE", lastMessage);
            return lastMessage;
        }
        throw new Error("AddingMessageError");
    }

    async getMessages(): Promise<Message[]> {
        const usersDB = await this.chatDocument.find({});

        const messages = usersDB.flatMap((userDB) =>
            userDB.messages.map((messageDB) => {
                const message = new Message(
                    messageDB.text,
                    messageDB.userName,
                    messageDB._id
                );
                message.sentDate = messageDB.sentDate;
                return message;
            })
        );
        messages.sort((a, b) =>
            a.sentDate.getTime() - b.sentDate.getTime()
        );
        return messages;
    }
}