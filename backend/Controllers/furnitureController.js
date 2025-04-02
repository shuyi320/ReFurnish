import { Sequelize } from "sequelize";
import db from "../Models/db.js";

const getFurniture = async (req, res) => {
  try {
    const furniture = await db.Furniture.findAll();
    res.status(200).json(furniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export  {getFurniture};