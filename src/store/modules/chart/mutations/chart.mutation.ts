import type { ChartState } from "../state";

export const beginRequestPieChart = (state: ChartState) => {
  state.pieChart.isLoading = true;
  state.pieChart.isError = false;
  state.pieChart.isSuccess = false;
  state.pieChart.error = "";
};

export const requestPieChartSuccess = (state: ChartState, data: any) => {
  state.pieChart.isLoading = false;
  state.pieChart.isError = false;
  state.pieChart.isSuccess = true;
  state.pieChart.error = "";
  state.pieChart.data = data;
};

export const requestPieChartError = (state: ChartState, error: string) => {
  state.pieChart.isLoading = false;
  state.pieChart.isError = true;
  state.pieChart.isSuccess = false;
  state.pieChart.error = error;
};

export const beginRequestWeekChart = (state: ChartState) => {
  state.weekChart.isLoading = true;
  state.weekChart.isError = false;
  state.weekChart.isSuccess = false;
  state.weekChart.error = "";
};

export const requestWeekChartSuccess = (state: ChartState, data: any) => {
  state.weekChart.isLoading = false;
  state.weekChart.isError = false;
  state.weekChart.isSuccess = true;
  state.weekChart.error = "";
  state.weekChart.data = data;
};

export const requestWeekChartError = (state: ChartState, error: string) => {
  state.weekChart.isLoading = false;
  state.weekChart.isError = true;
  state.weekChart.isSuccess = false;
  state.weekChart.error = error;
};
