import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "../initDatabase";
import { User } from "../domain/User";
import { io } from "../Server";
import passport from "passport";
import sanitizedConfig from "../../config/config";

// PASSPORT GOOGLE AUTH

export const googleUser: RequestHandler = passport.authenticate('google', {
    scope: ['email', 'profile']
})

export const googleUserCallback: RequestHandler = passport.authenticate("google", {
    successRedirect: "/api/callback",
    failureRedirect: "/api/auth/failure"
})

export const googleCallback = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = req.user;
        res.cookie('userData', JSON.stringify(userData), { path: '/', domain: 'localhost' });
        res.redirect(`http://localhost:${sanitizedConfig.FRONT_PORT}/`);
    } catch (err) {
        next(err);
    }
}

export const googleAuthFailure = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(401).json({ error: "Authentication failed" });
    } catch (err) {
        next(err);
    }
}

// CHAT APP

export const createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user_id = req.params.user_id;
    const { text } = req.body;
    try {
        const newMessage = await userService.createMessage(text, user_id);

        io.emit("new-message", newMessage)

        return res.status(200).json(newMessage);
    } catch (err) {
        next(err);
    }
}

export const getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    userService
        .getMessages()
        .then((users) => {
            if (users) {
                return res.status(200).json(users);
            }
        })
        .catch((err) => {
            next(err);
        });
};