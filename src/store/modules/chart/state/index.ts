import type {
  ApiRespond,
  PieTotalChartData,
  WeekChartData,
} from "@wanin/shared/types";

export type ChartState = {
  pieChart: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string;
    data: ApiRespond<PieTotalChartData> | null;
  };
  weekChart: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string;
    data: ApiRespond<WeekChartData> | null;
  };
};

export const chartInitState = {
  pieChart: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: "",
    data: null,
  },
  weekChart: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: "",
    data: null,
  },
} as ChartState;
