import { sideBarInitState } from "@wanin/store/modules/side-bar/state";
import * as sideBarMutations from "@wanin/store/modules/side-bar/mutations";
import * as sideBarActions from "@wanin/store/modules/side-bar/actions";

export const sideBarModule = {
  state: () => sideBarInitState,
  mutations: sideBarMutations,
  actions: sideBarActions,
};
