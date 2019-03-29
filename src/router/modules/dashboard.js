/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: AppMain组件下的router-view的所有路由
 * @Date: 2019-03-29 10:18:42
 * @LastEditTime: 2019-03-29 10:31:10
 */
import Dashboard from "@/views/layout/AppMain/Dashboard";
const dashboard = [
  // 默认渲染的路由
  {
    path: "",
    component: Dashboard
  },
  { path: "/dashboard", name: "dashboard", component: Dashboard }
];
export default dashboard;
