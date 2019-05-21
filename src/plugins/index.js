// 使用插件
import "@/plugins/animated.js";
import "@/plugins/element.js";
import "@/plugins/vcharts.js";
import "@/plugins/modal.js";
import "@/plugins/vueAsyncComputed.js";

// 引入eventbus
import eventbus from "@/eventbus";

// 引入echarts
import echarts from "echarts";

// 引入自定义filter
import * as filters from "@/filters";

// 引入mixins
import mixins from "@/mixins";

// 引入自定义的指令
import directives from "@/directives";

// 引入全局组件
import components from "@/components";

//引入axios
import axios from "axios";
export default {
  install(Vue) {
    // 全局实例属性
    Vue.prototype.$eventbus = eventbus;
    Vue.prototype.$echarts = echarts;
    Vue.prototype.$axios = axios;

    // 全局注册组件
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
    });

    // 注册全局过滤器
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key]);
    });

    // 全局注册mixins
    Vue.mixin(mixins);

    // 全局注册directives
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
