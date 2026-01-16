"use client";

import { useState } from "react";
import { useShoppingItemsStore } from "@/lib/shopping-items-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { ShoppingItem } from "@/types/shopping-item";
import { API_URL } from "@/lib/config";

export default function ShoppingItemList() {
  const [newItemName, setNewItemName] = useState("");
  const { items, setItems, addItem, updateItem, deleteItem } =
    useShoppingItemsStore();

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/api/items`);
    const data: ShoppingItem[] = await res.json();
    setItems(data);
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;

    const res = await fetch(`${API_URL}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItemName.trim() }),
    });
    const item: ShoppingItem = await res.json();
    addItem(item);
    setNewItemName("");
  };

  const handleToggleBought = async (id: string, bought: boolean) => {
    await fetch(`${API_URL}/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bought }),
    });
    updateItem(id, bought);
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/api/items/${id}`, {
      method: "DELETE",
    });
    deleteItem(id);
  };

  // Fetch items on mount
  useState(() => {
    fetchItems();
  });

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
        />
        <Button onClick={handleAddItem}>Add</Button>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <Checkbox
              checked={item.bought}
              onCheckedChange={(checked) =>
                handleToggleBought(item._id, checked === true)
              }
            />
            <span
              className={`flex-1 ${item.bought ? "line-through text-muted-foreground" : ""}`}
            >
              {item.name}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(item._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
