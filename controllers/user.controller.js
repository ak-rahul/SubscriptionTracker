import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users  = await User.find().select("-password");
        res.status(200).json({
            success: true,
            data: users
        });
    } catch(error) {
        next(error);
    }
}

import mongoose from "mongoose";

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format.",
            });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found...",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
