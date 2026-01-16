import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./items";
import { startServer } from "./server";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/items", itemsRouter);

startServer(app, PORT);
