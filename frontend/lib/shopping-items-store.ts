import { ShoppingItem } from "@/types/shopping-item";
import { create } from "zustand";

interface ShoppingItemsState {
  items: ShoppingItem[];
  setItems: (items: ShoppingItem[]) => void;
  addItem: (item: ShoppingItem) => void;
  updateItem: (id: string, bought: boolean) => void;
  deleteItem: (id: string) => void;
}

export const useShoppingItemsStore = create<ShoppingItemsState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
  updateItem: (id, bought) =>
    set((state) => ({
      items: state.items.map((item) =>
        item._id === id ? { ...item, bought } : item,
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    })),
}));
