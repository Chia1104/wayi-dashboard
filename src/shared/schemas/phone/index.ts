import { z } from "zod";

export const TaiwanPhoneSchema = z.string().regex(/^09\d{8}$/);
export const HongKongPhoneSchema = z.string().regex(/^(5|6|9)\d{7}$/);
export const MacaoPhoneSchema = z.string().regex(/^6\d{7}$/);
