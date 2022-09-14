import type { SideBarState } from "@wanin/store/modules/side-bar/state";

export const activeSideBar = (state: SideBarState) => {
  state.isOpen = !state.isOpen;
};
