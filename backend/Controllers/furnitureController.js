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

const reportFurniture = async (req, res) => {
    console.log("Reporting furniture", req.body);
  const { title, description, imageUrl, address, zipcode, borough, condition, reportedBy } = req.body;
  try {
    const newFurniture = await db.Furniture.create({
        title,
        description,
        imageUrl,
        address,
        zipcode,
        borough,
        condition,
        reportedBy
    });
    res.status(200).json("Successfully reported", newFurniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export  {getFurniture, reportFurniture};