import { mutation } from '../_generated/server';

export const insertNotification = mutation(async ({ db }, { item_id, notification_date, notification_type }) => {
  try {
    const notification_id = await db.table("Notifications").insert({
      item_id: item_id,
      notification_date: notification_date,
      notification_status: "pending", // Set status to pending initially
      notification_type: notification_type,
    });
    return notification_id;
  } catch (error) {
    console.error("Error inserting notification:", error);
    throw new Error("Failed to insert notification.");
  }
});
