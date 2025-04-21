import { getFurniture, getFurnitureById, reportFurniture, claimFurniture } from "../Controllers/furnitureController.js";
import express from "express";

const router = express.Router();

router.get("/", getFurniture);
router.get("/:id", getFurnitureById);
router.post("/report", reportFurniture);
router.post("/claim/:id", claimFurniture);

export default router;
