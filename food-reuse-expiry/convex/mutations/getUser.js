import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
 
export const doSomething = mutation({
  args: {/* ... */},
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!")
    }
    const user = await ctx.db.get(userId);
    // ...
  },
});