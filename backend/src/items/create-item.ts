import { Request, Response } from "express";
import { ShoppingItem } from "../schema";

export async function createItem(req: Request, res: Response) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  const item = new ShoppingItem({ name });
  await item.save();
  res.status(201).json(item);
}
