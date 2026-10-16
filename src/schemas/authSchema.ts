import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("That is not an email address."),

  // Eight matches itelect4-backend's User schema (minlength: 8). The
  // browser check is a courtesy; the schema is the rule.
  password: z.string().min(8, "At least 8 characters."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// .extend() adds to a schema instead of repeating it.
export const registerSchema = loginSchema.extend({
  name: z.string().min(1, "Your name is required."),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;