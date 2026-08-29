import { z } from "zod";

export const claimSchema = z.object({
  // .min(1) is what "required" means for a select: something must be chosen.
  itemId: z.string().min(1, "Select an item to claim."),

  // z.email() checks the whole shape of an email address.
  // .refine() adds any rule Zod does not ship: yours, as a function.
  contactEmail: z
    .email("That is not a valid email address.")
    .refine((email) => email.endsWith(".edu") || email.endsWith(".edu.ph"),
            "Use a school email address (.edu or .edu.ph)."),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;