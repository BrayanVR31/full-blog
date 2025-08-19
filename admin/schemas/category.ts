import { z } from "zod";
import { validationRegex } from "@/lib/validation";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(3, "Please enter a name with at least 3 characters.")
    .max(50, "Name cannot be longer than 50 characters."),
  slug: z.string().regex(validationRegex.slug, {
    message: "Slug can only contain lowercase, numbers and hyphens.",
  }),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
