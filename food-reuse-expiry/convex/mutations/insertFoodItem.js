// src/mutations/foodItems.ts
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const insertFoodItem = mutation({
  args: {
    userId: v.string(),
    itemName: v.string(),
    quantity: v.number(),
    expirationDate: v.string(), // Ensure format is "YYYY-MM-DD"
    dateLogged: v.string(), // Ensure format is "YYYY-MM-DD"
  },
  handler: async (ctx, args) => {
    const { userId, itemName, quantity, expirationDate, dateLogged } = args;

    // Verify user existence
    const user = await ctx.db.get("Users", userId);
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    // Insert new food item
    const itemId = await ctx.db.insert("Food_items", {
      user_id: userId,
      item_name: itemName,
      quantity,
      expiration_date: expirationDate,
      date_logged: dateLogged,
    });

    return itemId;
  },
});
