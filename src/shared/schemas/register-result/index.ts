import { z } from "zod";

export const RegisterResultSchema = z.object({
  id: z.number(),
  phone: z.string(),
  created_at: z.date(),
});
