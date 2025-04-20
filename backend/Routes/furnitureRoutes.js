import { getFurniture, reportFurniture } from "../Controllers/furnitureController.js";
import express from "express";

const router = express.Router();

router.get("/", getFurniture);
router.post("/report", reportFurniture);

export default router;
