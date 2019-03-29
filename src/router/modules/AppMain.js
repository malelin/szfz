/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: AppMain组件下的router-view的所有路由
 * @Date: 2019-03-29 10:18:42
 * @LastEditTime: 2019-03-29 11:19:11
 */
import Dashboard from "@/views/layout/AppMain/Dashboard";
const AppMain = [
  // 默认AppMain子路由
  { path: "", component: Dashboard },
  { path: "/dashboard", name: "dashboard", component: Dashboard }
];
export default AppMain;