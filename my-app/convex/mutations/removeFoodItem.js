import { mutation } from '../_generated/server';

export const removeFoodItemByName = mutation(async ({ db }, { user_id, item_name }) => {
  try {
    // Find the items to remove by user_id and item_name
    const itemsToRemove = await db.table("Food_items")
      .query()
      .filter(item => item.user_id === user_id && item.item_name === item_name)
      .run();

    if (itemsToRemove.length === 0) {
      throw new Error("No matching item found.");
    }

    // Remove all matching items
    await Promise.all(itemsToRemove.map(item => 
      db.table("Food_items").delete(item._id)
    ));

    return "Food items removed successfully.";
  } catch (error) {
    console.error("Error removing food item:", error);
    throw new Error("Failed to remove food items.");
  }
});