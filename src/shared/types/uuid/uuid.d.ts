import { z } from "zod";
import { UUIDSchema } from "@wanin/shared/schemas";

export type UUID = z.infer<typeof UUIDSchema>;
