import { z } from "zod";

const ActivitySchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  slug: z.string(),
  end_date: z.date(),
  img_url: z.string().optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;
