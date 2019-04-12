/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: AppMain组件下的router-view的所有路由
 * @Date: 2019-03-29 10:18:42
 * @LastEditTime: 2019-04-11 17:11:39
 */
import Dashboard from "@/views/Layout/AppMain/Dashboard/Dashboard";
import CreateTask from "@/views/Layout/AppMain/CreateTask/CreateTask";
import TaskOverview from "@/views/Layout/AppMain/TaskOverview/TaskOverview";
import UserManage from "@/views/Layout/AppMain/UserManage/UserManage";
import AuditLog from "@/views/Layout/AppMain/AuditLog/AuditLog";
import TaskDetail from "@/views/Layout/AppMain/TaskDetail/TaskDetail";
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
  },
  {
    path: "userManage",
    name: "userManage",
    component: UserManage,
    alias: "/userManage"
  },
  {
    path: "auditLog",
    name: "auditLog",
    component: AuditLog,
    alias: "/auditLog"
  },
  {
    path: "taskDetail/:tid",
    name: "taskDetail",
    component: TaskDetail,
    alias: "/taskDetail",
    props: true
  }
];
export default AppMain;
