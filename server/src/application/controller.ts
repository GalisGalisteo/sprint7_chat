import { NextFunction, Request, Response } from "express";
import { userService } from "../initDatabase";
import { User } from "../domain/User";
import bcrypt from "bcrypt";
import sanitizedConfig from "../../config/config";
import jwt from "jsonwebtoken";
import { io } from "../Server";
import passport from "passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

// export const GoogleLogin = passport.use(
//     new Strategy(
//         {
//             clientID: sanitizedConfig.GOOGLE_CLIENT_ID,
//             clientSecret: sanitizedConfig.GOOGLE_SECRET,
//             callbackURL: `http://localhost:${sanitizedConfig.PORT}${sanitizedConfig.GOOGLE_REDIRECT_URL}`,
//             passReqToCallback: true,
//         },
//         async (
//             request: Request,
//             accessToken: string,
//             refreshToken: string,
//             profile: Profile,
//             done: (error: any, user?: any, info?: any) => void
//         ) => {
//             try {
//                 if (profile._json.email && profile._json.name) {
//                     const user = await userService.findUserByEmail(profile._json.email);
//                     if (!user) {
//                         const newUser = new User(
//                             profile._json.email,
//                             profile._json.name,
//                             []
//                         );
//                         const response = await userService.createUser(newUser);
//                         if (response) {
//                             return done(null, response); // Pass the new user to Passport
//                         }
//                     }
//                     return done(null, user); // Pass the existing user to Passport
//                 } else {
//                     return done(null, false, { message: "Missing email or name" });
//                 }
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "no user found with this email" });
        }
        if (user.password) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "authentication failed" });
            }
        }
        const token = jwt.sign({ user_id: user.id }, sanitizedConfig.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token: token, name: user.name, id: user.id });
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

    const newUser = new User(email, name, [], hashedPassword);

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