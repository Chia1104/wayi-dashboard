import { type ActionContext } from "vuex";
import { type RootState } from "@wanin/store";
import { type ModalState } from "../state";

export const activeAddActivityModalAction = (
  context: ActionContext<ModalState, RootState>
) => {
  context.commit("activeAddActivityModal");
};

export const activeEditActivityModalAction = (
  context: ActionContext<ModalState, RootState>
) => {
  context.commit("activeEditActivityModal");
};
