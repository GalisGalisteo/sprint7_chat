import { NextFunction, Request, Response } from "express";
import { userService } from "../initDatabase";
import { User } from "../domain/User";
import bcrypt from "bcrypt";
import sanitizedConfig from "../../config/config";
import jwt from "jsonwebtoken";
import { connectedClients } from "../Server";

export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "no player found with this email" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "authentication failed" });
        }
        const token = jwt.sign({ user_id: user.id }, sanitizedConfig.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
}

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

export const createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user_id = req.params.user_id;
    const { text } = req.body;
    try {
        const newMessage = await userService.createMessage(text, user_id);

        for (const client of connectedClients) {
            client.send(JSON.stringify(newMessage));
        }
        return res.status(200).json(newMessage);
    } catch (err) {
        next(err);
    }
}