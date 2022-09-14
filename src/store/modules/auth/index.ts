import { authInitState } from "@wanin//store/modules/auth/state";
import * as authMutations from "@wanin/store/modules/auth/mutations";
import * as authActions from "@wanin/store/modules/auth/actions";

export const authModule = {
  state: () => authInitState,
  mutations: authMutations,
  actions: authActions,
};
