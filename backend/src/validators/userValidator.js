import { z } from "zod";

export const userValidator = z.object({
  firstname: z
    .string()
    .min(1, "Firstname required")
    .max(12, "Firstname is too long")
    .transform((s) => s.trim()),
  lastname: z
    .string()
    .min(1, "Lastname is required")
    .max(12, "Lastname is too long")
    .transform((s) => s.trim()),
  username: z
    .string()
    .min(1, "Username is required")
    .max(18, "Username is too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscore allowed")
    .toLowerCase()
    .transform((s) => s.trim()),
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .toLowerCase()
    .transform((s) => s.trim()),
  password: z
    .string()
    .min(1, "Password is required")
    .max(256, "Password is too long"),
});
