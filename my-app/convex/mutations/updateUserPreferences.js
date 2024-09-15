import { mutation } from "../_generated/server"; // Adjust the path based on your file structure

export const updateUserPreferences = mutation(async ({ db }, { userId, preferences }) => {
  // Validate that the userId and preferences are provided
  if (!userId || !preferences) {
    throw new Error("userId and preferences are required.");
  }

  // Update the notification_preferences column in the users table
  await db
    .table("users")
    .update(userId, {
      notification_preferences: preferences
    });

  return 'Notification preferences updated for user: ${userId}';
});
