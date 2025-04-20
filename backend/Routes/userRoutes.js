import { registerUser } from "../Controllers/UserControllers.js";
import express from "express";

const router = express.Router();
router.post("/register", registerUser);
export default router;