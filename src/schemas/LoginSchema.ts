import { z } from "zod";
export const LoginSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine(
    (data) => {
      return /\S+@\S+\.\S+/.test(data.email) && data.password.length >= 6;
    },
    {
      message: "Invalid email or password",
    }
  );

export type LoginInput = z.infer<typeof LoginSchema>;
