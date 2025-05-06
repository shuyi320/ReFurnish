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

const getFurnitureById = async (req, res) => {
    const { id } = req.params;
    try {
        const furniture = await db.Furniture.findOne({
            where: { id: id }
        })
        if (!furniture) {
            return res.status(404).json({ message: "Furniture not found" });
        }
        console.log("Furniture found:", furniture);
        res.status(200).json(furniture);
    }
    catch (error) {
        console.error("Error fetching furniture:", error);
        res.status(500).json({ message: "Internal server error" });
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

const claimFurniture = async (req, res) => {
    const { id } = req.params;
    const { claimedBy } = req.body;
    try {
        const furniture = await db.Furniture.findOne({
            where: { id: id }
        })
        if (!furniture) {
            return res.status(404).json({ message: "Furniture not found" });
        }
        if( furniture.status === "claimed") {
            return res.status(400).json({ message: "Furniture is already claimed" });
        }
        furniture.claimedBy = claimedBy;
        furniture.status = "claimed";
        await furniture.save();
        return res.status(200).json({message: "Furniture successfully claimed",});
    }
    catch (error) {
        console.error("Error claiming furniture:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export  {getFurniture, getFurnitureById, reportFurniture, claimFurniture};