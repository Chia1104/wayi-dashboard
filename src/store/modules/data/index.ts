import { dataInitState } from "@wanin/store/modules/data/state";
import * as dataMutations from "@wanin/store/modules/data/mutations";
import * as dataActions from "@wanin/store/modules/data/actions";

export const dataModule = {
  state: () => dataInitState,
  mutations: dataMutations,
  actions: dataActions,
};
