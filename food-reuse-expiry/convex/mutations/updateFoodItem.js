import { mutation } from '../_generated/server';

export const updateFoodItem = mutation(async ({ db }, { userId, itemName, quantity, expirationDate, dateLogged }) => {
  try {
    // Find the item by user_id and item_name
    const item = await db.query("Food_items")
      .filter(q => q.and(q.eq(q.field("user_id"), userId), q.eq(q.field("item_name"), itemName)))
      .first();

    if (!item) {
      throw new Error(`Item "${itemName}" for user "${userId}" not found.`);
    }

    // Update the item with the new values
    await db.patch(item._id, {
      quantity,
      expiration_date: expirationDate,
      date_logged: dateLogged,
    });

    return "Food item updated successfully.";
  } catch (error) {
    console.error("Error updating food item:", error);
    throw new Error("Failed to update food item.");
  }
});
