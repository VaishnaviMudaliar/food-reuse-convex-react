import { mutation } from "../_generated/server";

export const checkNearingExpiryItems = mutation({
  handler: async (ctx) => {
    const today = new Date();
    
    // Calculate the date 2 days from today
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);

    // Format dates as "YYYY-MM-DD"
    const todayFormatted = today.toISOString().split("T")[0];
    const twoDaysLaterFormatted = twoDaysLater.toISOString().split("T")[0];

    // Query for food items expiring within the next 2 days
    const nearingExpiryItems = await ctx.db.query("Food_items")
      .filter(q => q.gte(q.field("expiration_date"), todayFormatted))
      .filter(q => q.lte(q.field("expiration_date"), twoDaysLaterFormatted))
      .collect();

    return nearingExpiryItems;
  },
});
