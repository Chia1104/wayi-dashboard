import type { DataState } from "../state";

export const setRealCount = (state: DataState, realCount: number) => {
  state.realCount = realCount;
};

export const setFakeCount = (state: DataState, fakeCount: number) => {
  state.fakeCount = fakeCount;
};

export const setActivities = (
  state: DataState,
  activities: DataState["activities"]
) => {
  state.activities = activities;
};
