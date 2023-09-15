import express from "express";
import { createMessage, createUser, getMessages, handleLogin } from "../application/controller";
import authenticate from "../infrastructure/middleware/auth";
import passport from "passport";
import { isAuthenticated, isAuthenticatedFront, isLoggedIn, isLoggedInFront } from "../infrastructure/middleware/isLoggedIn";


const router = express.Router();

router.get("/auth/google",
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }), (req, res) => {
        res.send(200);
    })
router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "/api/callback",
    failureRedirect: "/api/auth/failure"
}));

router.get("/callback", (req, res) => {
    const userData = req.user;
    console.log(userData)
    res.cookie('userData', JSON.stringify(userData), { path: '/', domain: 'localhost' });
    res.redirect("http://localhost:5174/");
});

router.get("/auth/failure", (req, res) => {
    res.status(401).json({ error: "Authentication failed" });
});

router.post("/login", handleLogin)
router.post("/user", createUser);
router.post("/message/:user_id", createMessage)
router.get("/messages/", getMessages)

// Create a server-side route to check authentication status
router.get("/auth/check-auth", isAuthenticatedFront);


export default router;