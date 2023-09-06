import express from "express";
import { createUser, handleLogin } from "./application/controller";

const router = express.Router();

router.post("/login", handleLogin)
router.post("/user", createUser);

export default router;