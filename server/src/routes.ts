import express from "express";
import { createMessage, createUser, handleLogin } from "./application/controller";
import authenticate from "./infrastructure/middleware/auth";

const router = express.Router();

router.post("/login", handleLogin)
router.post("/user", createUser);
router.post("/message/:user_id", authenticate, createMessage)

export default router;