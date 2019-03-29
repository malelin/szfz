import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "@/stylus/index.styl";
import "@/plugins/animated.js";
import "@/plugins/element.js";
import "@/plugins/vcharts.js";
import plugins from "@/plugins";
import "./icons";
Vue.config.productionTip = false;

Vue.use(plugins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
