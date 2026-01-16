import { Router } from "express";
import { getItems } from "./get-items";
import { createItem } from "./create-item";
import { updateItem } from "./update-item";
import { deleteItem } from "./delete-item";

const router = Router();

router.get("/", getItems);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
