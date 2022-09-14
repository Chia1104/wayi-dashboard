import { type ActionContext } from "vuex";
import { type RootState } from "@wanin/store";
import { type SideBarState } from "../state";

export const activeSideBarAction = (
  context: ActionContext<SideBarState, RootState>
) => {
  context.commit("activeSideBar");
};
