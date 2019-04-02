/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: AppMain组件下的router-view的所有路由
 * @Date: 2019-03-29 10:18:42
 * @LastEditTime: 2019-04-02 12:30:36
 */
import Dashboard from "@/views/Layout/AppMain/Dashboard/Dashboard";
import CreateTask from "@/views/Layout/AppMain/CreateTask/CreateTask";
import TaskOverview from "@/views/Layout/AppMain/TaskOverview/TaskOverview";
const AppMain = [
  // 默认AppMain子路由
  { path: "", redirect: { path: "/dashboard" } },
  {
    path: "dashboard",
    name: "dashboard",
    component: Dashboard,
    alias: "/dashboard"
  },
  {
    path: "createTask",
    name: "createTask",
    component: CreateTask,
    alias: "/createTask"
  },
  {
    path: "taskOverview",
    name: "taskOverview",
    component: TaskOverview,
    alias: "/taskOverview"
  }
];
export default AppMain;
