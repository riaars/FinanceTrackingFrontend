import { z } from "zod";
export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    repassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine(
    (data) => {
      return data.password === data.repassword;
    },
    {
      path: ["repassword"],
      message: "Passwords do not match",
    }
  );

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
