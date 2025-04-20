import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, "User name is required..."],
        trim: true,
        minLength: 3,
        maxLength: 60
    },
    email: {
        type: String,
        required: [true, "Email is required...."],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please do fill a valid email.."]
    },
    password: {
        type: String,
        required: [true, "User password is required..."],
        minLength: 6
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;