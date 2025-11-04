import { z } from "zod";
export const ForgotPasswordSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
  })
  .refine(
    (data) => {
      return /\S+@\S+\.\S+/.test(data.email);
    },
    {
      message: "Invalid email format",
    }
  );

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
