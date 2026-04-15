import z from "zod";

export const tutorSearchSchema = z.object({
  category: z.string().optional(),
  sortBy: z.enum(["newest", "price_asc", "price_desc"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export type TutorSearchParams = z.infer<typeof tutorSearchSchema>;
