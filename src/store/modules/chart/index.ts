import { chartInitState } from "@wanin/store/modules/chart/state";
import * as chartMutations from "@wanin/store/modules/chart/mutations";
import * as chartActions from "@wanin/store/modules/chart/actions";

export const chartModule = {
  state: () => chartInitState,
  mutations: chartMutations,
  actions: chartActions,
};
