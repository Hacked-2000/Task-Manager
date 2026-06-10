import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./src/config/db";
import router from "./src/routes/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api", router);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
