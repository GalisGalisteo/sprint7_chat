import express from "express";
import { createRoom } from "./application/controller";

const router = express.Router();

router.post("/new-room", createRoom);

export default router;