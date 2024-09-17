import { query } from "../_generated/server";
import { Id } from "../_generated/dataModel"; // Import Id type

// Query to fetch food items for a specific user
export const getFoodItems = query(async ({ db }, { userId }: { userId: Id<"users"> }) => {
  const foodItems = await db
    .query("Food_items")
    .withIndex("food_items", (q) => q.eq("user_id", userId)) // Use the Convex Id<"users"> type
    .collect();

  return foodItems;
});
