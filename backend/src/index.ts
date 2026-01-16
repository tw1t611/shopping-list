import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase, closeDatabase } from "./db";
import { ShoppingItem } from "./schema";

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

// API routes
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Shopping List API" });
});

// Get all items
app.get("/items", async (req: Request, res: Response) => {
  const items = await ShoppingItem.find().sort({ createdAt: -1 });
  res.json(items);
});

// Add new item
app.post("/items", async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  const item = new ShoppingItem({ name });
  await item.save();
  res.status(201).json(item);
});

// Update bought status
app.put("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bought } = req.body;
  if (typeof bought !== "boolean") {
    res.status(400).json({ error: "Bought must be a boolean" });
    return;
  }
  const item = await ShoppingItem.findByIdAndUpdate(
    id,
    { bought },
    { new: true },
  );
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(item);
});

// Delete item
app.delete("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await ShoppingItem.findByIdAndDelete(id);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.status(204).send();
});

// Start server
async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await closeDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nShutting down gracefully...");
  await closeDatabase();
  process.exit(0);
});

startServer();
