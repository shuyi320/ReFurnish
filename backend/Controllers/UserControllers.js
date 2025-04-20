import db from "../Models/db.js";
import { Sequelize } from "sequelize";

const { User } = db;
const registerUser = async (req, res) => {
    const { clerkUserId, email, imageUrl, username } = req.body;
    
    const existingUser = await User.findOne({ where: { clerkUserId } });
    if (existingUser) {
        return res.json({ message: "User already exists" });
    }
    try {
        const newUser = await User.create({
                clerkUserId,
                email,
                imageUrl,
                username,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { registerUser };