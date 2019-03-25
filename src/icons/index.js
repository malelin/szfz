import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg组件

// 全局注册SvgIcon组件
Vue.component("svg-icon", SvgIcon);
// 自动导入所有的图标
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
