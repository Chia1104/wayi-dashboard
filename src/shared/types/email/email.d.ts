import { EmailSchema } from "@wanin/shared/schemas";
import { z } from "zod";

export type Email = z.infer<typeof EmailSchema>;
