import {
  getCountGroupByRegionAndWeek,
  getTotalCountGroupByRegion,
} from "@wanin/helpers/api";
import { type ActionContext } from "vuex";
import { type RootState } from "@wanin/store";
import { type ChartState } from "../state";

export const getTotalCountGroupByRegionAction = async (
  context: ActionContext<ChartState, RootState>,
  { token, activitySlug }: { token: string; activitySlug: string }
) => {
  context.commit("beginRequestPieChart");
  try {
    const data = await getTotalCountGroupByRegion(token, activitySlug);
    data.status === 200
      ? context.commit("requestPieChartSuccess", data.data)
      : context.commit(
          "requestPieChartError",
          data.data?.message || "No total count found"
        );
  } catch (e) {
    context.commit("getTotalCountGroupByRegionError", "Get total count error");
  }
};

export const getCountGroupByRegionAndWeekAction = async (
  context: ActionContext<ChartState, RootState>,
  { token, activitySlug }: { token: string; activitySlug: string }
) => {
  context.commit("beginRequestWeekChart");
  try {
    const data = await getCountGroupByRegionAndWeek(token, activitySlug);
    data.status === 200
      ? context.commit("requestWeekChartSuccess", data.data)
      : context.commit(
          "requestWeekChartError",
          data.data?.message || "No count found"
        );
  } catch (e) {
    context.commit("requestWeekChartError", "Get count error");
  }
};
