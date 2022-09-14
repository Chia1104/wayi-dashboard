import { z } from "zod";
import { RegisterResultSchema } from "@wanin/shared/schemas";

export type RegisterResult = z.infer<typeof RegisterResultSchema>;
