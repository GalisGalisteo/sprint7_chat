import express from "express";
import { createUser } from "./application/controller";

const router = express.Router();

router.post("/user", createUser);

export default router;