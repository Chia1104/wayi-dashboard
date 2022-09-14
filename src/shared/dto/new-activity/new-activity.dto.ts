import { z } from "zod";

const NewActivityDtoSchema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/),
  end_date: z.date(),
});

export type NewActivityDto = z.infer<typeof NewActivityDtoSchema>;
