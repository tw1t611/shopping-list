import * as mongoose from "mongoose";

const shoppingItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bought: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export type ShoppingItem = mongoose.InferSchemaType<typeof shoppingItemSchema>;
export const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);
