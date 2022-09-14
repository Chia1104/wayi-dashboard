import { type ActionContext } from "vuex";
import { type DataState } from "../state";
import { type RootState } from "@wanin/store";

export const setRealCountAction = (
  context: ActionContext<DataState, RootState>,
  count: number
) => context.commit("setRealCount", count);

export const setFakeCountAction = (
  context: ActionContext<DataState, RootState>,
  count: number
) => context.commit("setFakeCount", count);

export const setActivitiesAction = (
  context: ActionContext<DataState, RootState>,
  activities: DataState["activities"]
) => context.commit("setActivities", activities);
