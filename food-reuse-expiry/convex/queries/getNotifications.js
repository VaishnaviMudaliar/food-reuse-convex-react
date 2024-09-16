import { query } from '../_generated/server';

export const getNotifications = query(async ({ db }, { userId }) => {
  try {
    const notifications = await db.table("Notifications").findMany({
      where: { user_id: userId, notification_status: "pending" },
      orderBy: { notification_date: "asc" } // Order by date
    });
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications.");
  }
});
