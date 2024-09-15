import { mutation } from '../_generated/server';

export const insertUser = mutation(async ({ db }, { email, password, notificationPreferences }) => {
  try {
    const userId = await db.table("Users").insert({
      email: email,
      password: password,
      notification_preferences: notificationPreferences,
    });

    return userId;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Failed to insert user.");
  }
});

