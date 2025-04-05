import express from "express";
import cors from 'cors';
const app = express();
import { sequelize } from "./Models/db.js";
import furnitureRoutes from "./Routes/furnitureRoutes.js";


// CORS configuration allowing both localhost and 127.0.0.1
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL
  ],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/furnitures", furnitureRoutes);

// start database
await sequelize.sync({ force: false });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});