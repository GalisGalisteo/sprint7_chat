import { NextFunction, Request, Response } from "express";
import { Room } from "../domain/Room";
import { chatRoomDocument } from "../initDatabase";

export const createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!("name" in req.body)) {
        return res.status(400).json({ Bad_reqest: "Name required" });
    }
    const { name } = req.body;

    const newRoom = new Room(name, []);

    const createRoom = async (room: any) => {
        const newRoom = {
            name: room.name,
            users: room.users
        }
        const roomDB = await chatRoomDocument.create(newRoom);
        if (!roomDB) {
            throw new Error("Can't create Room")
        }
        return roomDB.id;
    }

    createRoom(newRoom)
        .then((response) => {
            return res.status(201).json({ room_id: response });
        })
        .catch((err: Error) => {
            next(err);
        });
}