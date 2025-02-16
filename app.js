import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("welcome to the Subscription tacker API !!");
});

app.listen(3000, () => {
    console.log("Subscription Tracker APi running on port 3000"); 
});

export default app;