import { createStore } from "vuex";
import { sideBarModule } from "@wanin/store/modules/side-bar";
import { authModule } from "@wanin/store/modules/auth";
import { chartModule } from "@wanin/store/modules/chart";
import { dataModule } from "@wanin/store/modules/data";
import { modalModule } from "@wanin/store/modules/modal";
import { AuthState } from "@wanin/store/modules/auth/state";
import { DataState } from "@wanin/store/modules/data/state";
import { ChartState } from "@wanin/store/modules/chart/state";
import { SideBarState } from "@wanin/store/modules/side-bar/state";
import { ModalState } from "@wanin/store/modules/modal/state";

const store = createStore({
  modules: {
    sideBar: sideBarModule,
    auth: authModule,
    chart: chartModule,
    data: dataModule,
    modal: modalModule,
  },
});

export type RootState = {
  sideBar: SideBarState;
  auth: AuthState;
  chart: ChartState;
  data: DataState;
  modal: ModalState;
};

export default store;
