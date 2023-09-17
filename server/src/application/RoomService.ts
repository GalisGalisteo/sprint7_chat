import { RoomInterface } from "./RoomInterface";

export class RoomService {
    roomInterface: RoomInterface;
    constructor(roomInterface: RoomInterface) {
        this.roomInterface = roomInterface;
    }
}