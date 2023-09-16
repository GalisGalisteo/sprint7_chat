import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes";
import { errorHandler } from "./errorHandler";
import passport from "passport";
import session from "express-session";
import sanitizedConfig from "../config/config";
import "../config/passportGoogle"

export const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: sanitizedConfig.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.use(
    (error: Error, _request: Request, response: Response, next: NextFunction) => {
        errorHandler(error, response, next);
    }
)