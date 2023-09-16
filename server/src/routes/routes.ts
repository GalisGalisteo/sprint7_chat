import express from "express";
import {
    createMessage,
    getMessages,
    googleCallback,
    googleUser,
    googleUserCallback
} from "../application/controller";


const router = express.Router();

// PASSPORT GOOGLE AUTH
router.get("/auth/google", googleUser);
router.get("/auth/google/callback", googleUserCallback);
router.get("/callback", googleCallback);
router.get("/auth/failure",);

// CHAT APP
router.post("/message/:user_id", createMessage)
router.get("/messages/", getMessages)

export default router;