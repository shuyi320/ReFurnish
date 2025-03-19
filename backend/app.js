import express from "express";
import cors from 'cors';
const app = express();
import { sequelize } from "./Models/db.js";

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// CORS configuration allowing both localhost and 127.0.0.1
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

const port = 3000;

// start database
await sequelize.sync({ force: false });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});