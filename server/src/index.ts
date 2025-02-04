import express from "express";
import "reflect-metadata"; 
import cors from "cors";
import { AppDataSource } from "./infrastructure/database/database";
import cardRoutes from "./infrastructure/routes/cardRoutes";


const app = express();
const port = 3001;  

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📌 Connected to the database");
    app.use("/", cardRoutes);

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  });
