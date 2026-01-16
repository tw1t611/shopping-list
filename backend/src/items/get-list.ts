import { Request, Response } from "express";
import { ShoppingItem } from "../schema";

export async function getItems(req: Request, res: Response) {
  const items = await ShoppingItem.find().sort({ createdAt: -1 });
  res.json(items);
}
