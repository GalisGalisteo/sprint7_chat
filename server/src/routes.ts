import express from "express";
import { createMessage, createUser, handleLogin } from "./application/controller";

const router = express.Router();

router.post("/login", handleLogin)
router.post("/user", createUser);
router.post("/message/:user_id", createMessage)

export default router;