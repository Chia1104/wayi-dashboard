import { z } from "zod";

const UpdateActivityDtoSchema = z.object({
  name: z.string().optional(),
  end_date: z.date().optional(),
});

export type UpdateActivityDto = z.infer<typeof UpdateActivityDtoSchema>;
