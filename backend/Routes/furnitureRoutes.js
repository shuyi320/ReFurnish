import { getFurniture } from "../Controllers/furnitureController.js";
import express from "express";

const router = express.Router();

router.get("/", getFurniture);

export default router;
