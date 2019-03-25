import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import login from "@/views/login";
Vue.use(Router);
export const constantRoutes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];
//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
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
// 路由白名单，不需要进行token验证
const routerWhiteList = ["/login", "/403", "/404", "/405"];
//在每次进行路由跳转之前进行
router.beforeEach((to, from, next) => {
  //增加登录验证
  const isLogin = localStorage.getItem("token") ? true : false;
  if (routerWhiteList.includes(to.path)) {
    //如果在白名单内，不需要token
    next();
  } else {
    //如果不是登录页面就要判断是否登录
    isLogin ? next() : next("/login");
  }
});
export default router;
