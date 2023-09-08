import express from "express";
import { createMessage, createUser, getMessages, handleLogin } from "./application/controller";
import authenticate from "./infrastructure/middleware/auth";

const router = express.Router();

router.post("/login", handleLogin)
router.post("/user", createUser);
router.post("/message/:user_id", authenticate, createMessage)
router.get("/messages/", authenticate, getMessages)
// get users

export default router;