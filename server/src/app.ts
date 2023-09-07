import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import http from "http";
import { Server } from "socket.io";
import { errorHandler } from "./errorHandler";

const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", router);

app.use(
    (error: Error, _request: Request, response: Response, next: NextFunction) => {
        errorHandler(error, response, next);
    }
)