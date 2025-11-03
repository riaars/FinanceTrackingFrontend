import { z } from "zod";
export const SignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine(
    (data) => {
      return data.password === data.repassword;
    },
    { path: ["repassword"], message: "Passwords do not match" }
  );

export type SignupInput = z.infer<typeof SignupSchema>;
