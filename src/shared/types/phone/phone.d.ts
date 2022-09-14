import {
  TaiwanPhoneSchema,
  MacaoPhoneSchema,
  HongKongPhoneSchema,
} from "@wanin/shared/schemas";
import { z } from "zod";

type TaiwanPhone = z.infer<typeof TaiwanPhoneSchema>;
type HongKongPhone = z.infer<typeof HongKongPhoneSchema>;
type MacaoPhone = z.infer<typeof MacaoPhoneSchema>;

export type Phone = TaiwanPhone | HongKongPhone | MacaoPhone;
