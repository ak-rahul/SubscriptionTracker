import { Router } from "express";

const authRouter = Router();

authRouter.post('sign-up' , (req, res) => {
    res.send("Sign Up now........");
})

authRouter.post('sign-in' , (req, res) => {
    res.send("Sign In now........");
})

authRouter.post('sign-out' , (req, res) => {
    res.send("Byee........");
})

export default authRouter;