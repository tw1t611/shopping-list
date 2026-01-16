import { Request, Response } from "express";
import { ShoppingItem } from "../schema";

export async function updateItem(req: Request, res: Response) {
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
}
