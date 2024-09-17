import { mutation } from '../_generated/server';

export const removeFoodItem = mutation(async ({ db }, { userId, itemName }) => {
  try {
    // Find the item(s) by user_id and item_name
    const itemsToRemove = await db.query("Food_items")
      .filter(q => q.and(q.eq(q.field("user_id"), userId), q.eq(q.field("item_name"), itemName)))
      .collect();

    if (itemsToRemove.length === 0) {
      throw new Error(`No items found with name "${itemName}" for user "${userId}".`);
    }

    // Remove all matching items
    await Promise.all(
      itemsToRemove.map(item => db.delete(item._id))
    );

    return "Food items removed successfully.";
  } catch (error) {
    console.error("Error removing food items:", error);
    throw new Error("Failed to remove food items.");
  }
});
