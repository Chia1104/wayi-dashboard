import { modalInitState } from "@wanin/store/modules/modal/state";
import * as modalMutations from "@wanin/store/modules/modal/mutations";
import * as modalActions from "@wanin/store/modules/modal/actions";

export const modalModule = {
  state: () => modalInitState,
  mutations: modalMutations,
  actions: modalActions,
};
