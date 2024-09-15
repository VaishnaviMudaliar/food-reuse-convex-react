/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as messages from "../messages.js";
import type * as mutations_getUser from "../mutations/getUser.js";
import type * as mutations_insertFoodItem from "../mutations/insertFoodItem.js";
import type * as mutations_insertNotification from "../mutations/insertNotification.js";
import type * as mutations_insertUser from "../mutations/insertUser.js";
import type * as mutations_removeFoodItem from "../mutations/removeFoodItem.js";
import type * as mutations_signupUser from "../mutations/signupUser.js";
import type * as mutations_updateFoodItem from "../mutations/updateFoodItem.js";
import type * as mutations_updateUserPreferences from "../mutations/updateUserPreferences.js";
import type * as mutations_users from "../mutations/users.js";
import type * as queries_getCurrentUser from "../queries/getCurrentUser.js";
import type * as queries_getNotifications from "../queries/getNotifications.js";
import type * as queries_getRecipesByIngredients from "../queries/getRecipesByIngredients.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  http: typeof http;
  messages: typeof messages;
  "mutations/getUser": typeof mutations_getUser;
  "mutations/insertFoodItem": typeof mutations_insertFoodItem;
  "mutations/insertNotification": typeof mutations_insertNotification;
  "mutations/insertUser": typeof mutations_insertUser;
  "mutations/removeFoodItem": typeof mutations_removeFoodItem;
  "mutations/signupUser": typeof mutations_signupUser;
  "mutations/updateFoodItem": typeof mutations_updateFoodItem;
  "mutations/updateUserPreferences": typeof mutations_updateUserPreferences;
  "mutations/users": typeof mutations_users;
  "queries/getCurrentUser": typeof queries_getCurrentUser;
  "queries/getNotifications": typeof queries_getNotifications;
  "queries/getRecipesByIngredients": typeof queries_getRecipesByIngredients;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
