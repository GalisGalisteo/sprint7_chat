import { Model } from "mongoose";
import { UserInterface } from "../application/UserInterface";
import { Message } from "../domain/Message";
import { IRoomMongoDB, IUserMongoDB } from "../domain/interfaces";
import { User } from "../domain/User";
import { RoomInterface } from "../application/RoomInterface";

export class UserMongoDBManager implements UserInterface {
    private userDocument: Model<IUserMongoDB>
    constructor(userDocument: Model<IUserMongoDB>) {
        this.userDocument = userDocument
    }
    async createUser(user: User): Promise<string> {
        const nameEmailAlreadyExists = await this.userDocument.findOne({
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
            const userDB = await this.userDocument.create(newUser);
            return userDB.id;
        } catch (err) {
            throw err;
        }
    }

    async findUserByEmail(userEmail: string): Promise<User> {
        const userDetails = await this.userDocument.findOne({ email: userEmail });
        if (!userDetails) {
            throw new Error("EmailNotExists");
        }
        const { name, email, password, messages, id } = userDetails;
        return new User(email, name, password, messages, id)
    }

    async findUserById(user_id: string): Promise<User> {
        const userDetails = await this.userDocument.findById(user_id);
        if (!userDetails) {
            throw new Error("UserNotFound");
        }
        const { name, email, password, messages, id } = userDetails;
        return new User(email, name, password, messages, id)
    }

    async createMessage(text: string, user_id: string): Promise<Message> {
        const user = await this.findUserById(user_id);
        const message = await new Message(text, user.name);
        await user.addNewMessage(message);
        const response = await this.userDocument.replaceOne(
            { _id: { $eq: user.id } },
            user
        );
        if (response.modifiedCount === 1) {
            const lastMessage = user.messages[user.messages.length - 1];
            return lastMessage;
        }
        throw new Error("AddingMessageError");
    }

    async getMessages(): Promise<Message[]> {
        const usersDB = await this.userDocument.find({});

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

export class RoomMongoDBManager implements RoomInterface {
    private roomDocument: Model<IRoomMongoDB>
    constructor(roomDocument: Model<IRoomMongoDB>) {
        this.roomDocument = roomDocument
    }

    async createRoom(user: User): Promise<string> {
        try {
            const roomDB = await this.roomDocument.create(user);
            return roomDB.id;
        } catch (err) {
            throw err;
        }
    }
}