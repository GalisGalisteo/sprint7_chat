import express from "express";
import { addUser } from "./application/controller";

const router = express.Router();

router.post("/user", addUser);

export default router;