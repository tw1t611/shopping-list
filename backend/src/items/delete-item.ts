import { Request, Response } from "express";
import { ShoppingItem } from "../schema";

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;
  const item = await ShoppingItem.findByIdAndDelete(id);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.status(204).send();
}
