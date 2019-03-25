import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "@/stylus/index.styl";
import "@/plugins/element.js";
import plugins from "@/plugins";

Vue.config.productionTip = false;

Vue.use(plugins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
