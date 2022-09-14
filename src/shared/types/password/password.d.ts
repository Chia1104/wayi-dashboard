import { PasswordSchema } from "@wanin/shared/schemas";
import { z } from "zod";

export type Password = z.infer<typeof PasswordSchema>;
