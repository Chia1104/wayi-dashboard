import { z } from "zod";

export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/);
