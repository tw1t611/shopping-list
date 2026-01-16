import { API_URL } from "../lib/config";

async function globalSetup() {
  const res = await fetch(`${API_URL}/api/items`);
  const items = await res.json();

  await Promise.all(
    items.map((item: { _id: string }) =>
      fetch(`${API_URL}/api/items/${item._id}`, { method: "DELETE" })
    )
  );

  console.log(`Cleared ${items.length} items from database`);
}

export default globalSetup;
