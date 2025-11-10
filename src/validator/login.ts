import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
});

export type LoginFormType = z.infer<typeof loginSchema>;
