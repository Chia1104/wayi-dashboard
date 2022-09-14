import type { Activity } from "@wanin/shared/types";

export type DataState = {
  realCount: number;
  fakeCount: number;
  activities: Activity[];
};

export const dataInitState = {
  realCount: 0,
  fakeCount: 0,
  activities: [],
} as DataState;
