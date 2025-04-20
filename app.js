import express from "express";
import {PORT} from "./config/env.js"

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.get('/' , (req, res) => {
    res.send("Welcome to Subscription Tracker API");
})

app.listen(PORT , async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Link : http://localhost:${PORT}`);

    await connectToDatabase(); 
})

export default app;