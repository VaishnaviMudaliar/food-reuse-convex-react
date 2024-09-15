import { query } from "../_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getRecipesByIngredients = query({
  args: {
    cuisine: v.optional(v.string()),           // Optional cuisine filter
    mainIngredients: v.optional(v.array(v.string())), // List of main ingredients
    paginationOpts: v.optional(paginationOptsValidator), // Pagination options
  },
  handler: async (ctx, { cuisine, mainIngredients, paginationOpts }) => {
    let recipesQuery = ctx.db.query("Recipes");

    // Apply cuisine filter if provided
    if (cuisine) {
      recipesQuery = recipesQuery.filter((q) => q.eq(q.field("cuisine"), cuisine));
    }

    // Apply main ingredients filter if provided
    if (mainIngredients && mainIngredients.length > 0) {
      recipesQuery = recipesQuery.filter((q) => 
        q.or(
          ...mainIngredients.map(ingredient => q.eq(q.field("mainIngredients"), ingredient))
        )
      );
    }

    // Handle pagination
    if (paginationOpts) {
      // Apply pagination and return results
      return await recipesQuery.paginate(paginationOpts);
    } else {
      // Collect all results without pagination
      return await recipesQuery.collect();
    }
  }
});