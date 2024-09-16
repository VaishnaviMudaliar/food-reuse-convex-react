import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
  }),
  Food_items: defineTable({
    // item_id: v.optional(v.id("items")),
    user_id: v.id("users"),
    item_name: v.string(),
    quantity: v.float64(),
    expiration_date: v.string(),
    date_logged: v.string(),
  }).index("food_items", ["user_id", "item_name"]),

  Notifications: defineTable({
    notification_id: v.id("Notifications"),
    item_id: v.id("Food_items"),
    notification_date: v.string(),
    notification_status: v.string(),
    notification_type: v.string(),
  }).index("item_notifications", ["item_id"]),

  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    notification_preferences: v.optional(v.array(v.string())),
  }).index("email", ["email"])
});
