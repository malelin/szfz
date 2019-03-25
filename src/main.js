import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import * as filters from "@/filters"; // global filters
import store from "@/store";
import "@/stylus/index.styl";
import "./plugins/element.js";
// 引入echarts
import echarts from "echarts";

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
