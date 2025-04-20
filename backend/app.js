import express from "express";
import cors from 'cors';
const app = express();
import { sequelize } from "./Models/db.js";
import furnitureRoutes from "./Routes/furnitureRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import dotenv from 'dotenv';
dotenv.config();


// CORS configuration allowing both localhost and 127.0.0.1
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
console.log("Frontend allowed origin:", process.env.FRONTEND_URL);
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/furnitures", furnitureRoutes);
app.use("/api/users", userRoutes);

// start database
await sequelize.sync({ force: false });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});