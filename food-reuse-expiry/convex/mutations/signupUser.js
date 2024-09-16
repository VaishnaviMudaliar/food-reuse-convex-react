import { mutation } from '../_generated/server';
import bcrypt from 'bcryptjs'; // Ensure bcrypt is installed for password hashing

// Constants for error messages
const USER_ALREADY_EXISTS = "User already exists with this email.";
const SIGNUP_FAILED = "Failed to sign up user.";
const PASSWORD_TOO_WEAK = "Password must be at least 8 characters long.";

export const signupUser = mutation(async ({ db }, { email, password }) => {
  try {
    // Validate password strength
    if (password.length < 8) {
      throw new Error(PASSWORD_TOO_WEAK);
    }

    // Check if the email already exists
    const existingUser = await db.table("Users").query().filter({ email }).first();
    if (existingUser) {
      throw new Error(USER_ALREADY_EXISTS);
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const userId = await db.table("Users").insert({
      email: email,
      password: hashedPassword, // Store the hashed password
    });

    // Return a success response
    return {
      success: true,
      message: "User registered successfully.",
      userId: userId,
    };
  } catch (error) {
    console.error("Error signing up user:", error);
    throw new Error(SIGNUP_FAILED);
  }
});
