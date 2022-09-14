import { createApp, provide, h } from "vue";
import "./style.css";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "@wanin/helpers/GraphQL/apollo-client";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(store).use(router).use(MotionPlugin);
app.mount("#app");
