import { test, expect } from "@playwright/test";

test.describe("Shopping List", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the shopping list heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Shopping List" })).toBeVisible();
  });

  test("should display input field and add button", async ({ page }) => {
    await expect(page.getByPlaceholder("Add item...")).toBeVisible();
    await expect(page.getByRole("button", { name: "Add" })).toBeVisible();
  });

  test("should add a new item", async ({ page }) => {
    const itemName = `Test Item ${Date.now()}`;

    await page.getByPlaceholder("Add item...").fill(itemName);
    await page.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText(itemName)).toBeVisible();
  });

  test("should add item by pressing Enter", async ({ page }) => {
    const itemName = `Enter Item ${Date.now()}`;

    await page.getByPlaceholder("Add item...").fill(itemName);
    await page.getByPlaceholder("Add item...").press("Enter");

    await expect(page.getByText(itemName)).toBeVisible();
  });

  test("should toggle item as bought", async ({ page }) => {
    const itemName = `Toggle Item ${Date.now()}`;

    await page.getByPlaceholder("Add item...").fill(itemName);
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText(itemName)).toBeVisible();

    const listItem = page.locator("li").filter({ hasText: itemName });
    const checkbox = listItem.getByRole("checkbox");

    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await expect(listItem.locator("span.line-through")).toBeVisible();
  });

  test("should delete an item", async ({ page }) => {
    const itemName = `Delete Item ${Date.now()}`;

    await page.getByPlaceholder("Add item...").fill(itemName);
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText(itemName)).toBeVisible();

    const listItem = page.locator("li").filter({ hasText: itemName });
    await listItem.getByRole("button").click();

    await expect(page.getByText(itemName)).not.toBeVisible();
  });

  test("should not add empty items", async ({ page }) => {
    const initialItems = await page.locator("li").count();

    await page.getByRole("button", { name: "Add" }).click();

    const finalItems = await page.locator("li").count();
    expect(finalItems).toBe(initialItems);
  });
});
