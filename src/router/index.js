import Vue from "vue";
import Router from "vue-router";

import Login from "@/views/Login";
import Layout from "@/views/Layout";
import Register from "@/views/Register";

/* AppMain组件下的router-view的所有路由 */
import AppMain from "./modules/AppMain";
Vue.use(Router);
export const constantRoutes = [
  {
    path: "/",
    name: "home",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/layout",
    component: Layout,
    children: AppMain
  }
];
//异步挂载的路由
//动态需要根据权限加载的路由表
console.log(constantRoutes);
export const asyncRoutes = [
  // {
  //   path: "/permission",
  //   component: Layout,
  //   name: "权限测试",
  //   meta: { role: ["admin", "super_editor"] }, //页面需要的权限
  //   children: [
  //     {
  //       path: "index",
  //       component: Permission,
  //       name: "权限测试页",
  //       meta: { role: ["admin", "super_editor"] } //页面需要的权限
  //     }
  //   ]
  // },
  { path: "*", redirect: "/404", hidden: true }
];
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRoutes
});
// // 路由白名单，不需要进行token验证
// const routerWhiteList = ["/login", "/403", "/404", "/405"];
// //在每次进行路由跳转之前进行
// router.beforeEach((to, from, next) => {
//   //增加登录验证
//   const isLogin = sessionStorage.getItem("token") ? true : false;
//   if (routerWhiteList.includes(to.path)) {
//     //如果在白名单内，不需要token
//     next();
//   } else {
//     //如果不是登录页面就要判断是否登录
//     isLogin ? next() : next("/login");
//   }
// });
export default router;
