import { NextFunction, Request, Response } from "express";
import { chatDocument, userService } from "../initDatabase";
import { Message } from "../domain/Message";
import { IMessage, IUser, User } from "../domain/User";
import bcrypt from "bcrypt";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!("email" in req.body) || !("name" in req.body) || !("password" in req.body)) {
        return res.status(400).json({ Bad_reqest: "Email, name and password are required" });
    }
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(email, name, hashedPassword, []);

    userService
        .createUser(newUser)
        .then((response) => {
            return res.status(201).json({ user_id: response });
        })
        .catch((err: Error) => {
            next(err);
        })
}



export const addMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!("text" in req.body)) {
        return res.status(400).json({ Bad_reqest: "Text required" });
    }
    const { text } = req.body;

    const newMessage = new Message(text);

    const addMessage = async (message: IMessage) => {
        const newMessage = {
            text: message.text,
        }
        const messageDB = await chatDocument.create(newMessage);
        if (!messageDB) {
            throw new Error("Can't create Room")
        }
        return messageDB.id;
    }

    addMessage(newMessage)
        .then((response) => {
            return res.status(201).json({ message_id: response });
        })
        .catch((err: Error) => {
            next(err);
        });
}