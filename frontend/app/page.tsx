import ShoppingItemList from "@/components/shopping-item-list";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-md p-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Shopping List
          </h1>
          <ShoppingItemList />
        </div>
      </main>
    </div>
  );
}
