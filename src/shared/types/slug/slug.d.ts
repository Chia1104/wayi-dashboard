import { z } from "zod";
import { SlugSchema } from "@wanin/shared/schemas";

export type Slug = z.infer<typeof SlugSchema>;
