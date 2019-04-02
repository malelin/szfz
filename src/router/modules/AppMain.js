/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: AppMain组件下的router-view的所有路由
 * @Date: 2019-03-29 10:18:42
 * @LastEditTime: 2019-04-02 09:54:12
 */
import Dashboard from "@/views/Layout/AppMain/Dashboard";
import CreateTask from "@/views/Layout/AppMain/CreateTask";
import TaskOverview from "@/views/Layout/AppMain/TaskOverview";
const AppMain = [
  // 默认AppMain子路由
  { path: "", component: Dashboard },
  { path: "dashboard", name: "dashboard", component: Dashboard },
  { path: "createTask", name: "createTask", component: CreateTask },
  { path: "taskOverview", name: "taskOverview", component: TaskOverview }
];
export default AppMain;
