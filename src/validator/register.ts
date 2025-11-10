import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long")
    .optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  gender: z.enum(["male", "female"], "Gender is required"),
  isStudent: z.coerce.boolean("isStudent is required"),
  age: z.number().min(1, "Age is required"),
  field: z.string().min(2, "Field is required"),
  hobbies: z.string().optional(),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
