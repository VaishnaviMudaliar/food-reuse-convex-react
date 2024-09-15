// src/mutations/users.js
import { mutation } from "../_generated/server";
import { v } from "convex/values";  

export const store = mutation({
  // Define args to include notification_preferences
  args: {
    notification_preferences: v.optional(v.array(v.string())), // Define type as needed, could be object, string, etc.
  },
  handler: async (ctx, { notification_preferences }) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      console.log("Identity:", identity);  // Add this to debug

      if (!identity || !identity.email) {
        throw new Error("Called storeUser without authentication present or missing email");
      }

      // Check if we've already stored this user by email
      const user = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", identity.email))
        .unique();

      if (user !== null) {
        // If we've seen this identity before, update the name if it has changed
        if (user.name !== identity.name) {
          await ctx.db.patch(user._id, { name: identity.name, notification_preferences });
        }
        return user._id;
      }

      // If it's a new identity, create a new `User` with notification_preferences
      return await ctx.db.insert("users", {
        name: identity.name ?? "Anonymous",
        email: identity.email,
        notification_preferences: notification_preferences,  // Insert the notification preferences
      });
    } catch (error) {
      console.error("Error in mutation handler:", error);
      throw error;
    }
  },
});
