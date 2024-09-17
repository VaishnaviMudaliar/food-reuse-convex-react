import { mutation } from '../_generated/server';

export const insertFoodItem = mutation(async ({ db }, { userId,email, itemName, quantity, expirationDate, dateLogged, category }) => {
  try {
    console.log("Received userId:", userId);
    console.log("Type of userId:", typeof userId);
    console.log("Length of userId:", userId.length);

    // Validate and format expirationDate and dateLogged
    const formattedExpirationDate = expirationDate; // Ensure format "YYYY-MM-DD"
    const formattedDateLogged = dateLogged; // Ensure format "YYYY-MM-DD"

    // Verify that the userId matches Convex ID format
    // eslint-disable-next-line no-undef
    const user = await db.get(userId);

    if (!user) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error("User with ID ${userId} does not exist.");
    }

    const itemId = await db.table("Food_items").insert({
      user_id: userId, // Ensure user_id is directly used here
      item_name: itemName,
      quantity: quantity,
      expiration_date: formattedExpirationDate,
      date_logged: formattedDateLogged,
    });

    return itemId;
  } catch (error) {
    console.error("Error inserting food item:", error);
    throw new Error("Failed to insert food item.");
  }
});
