<!--
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: siderbar组件
 * @Date: 2019-03-27 10:01:30
 * @LastEditTime: 2019-04-19 12:25:37
 -->
<template>
  <div class="siderbar">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOut delay"
    >
      <div class="logo-container" v-show="!isCollapse">
        <svg-icon icon-class="logo" class-name="svg-logo"></svg-icon></div
    ></transition>
    <el-scrollbar class="c-scrollbar">
      <el-menu
        @select="onSelect"
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#ffffff"
        @open="onSubMenuOpen"
        @close="onSubMenuClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <svg-icon icon-class="kongzhi"></svg-icon>
            <span slot="title">控制面板</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">监控台</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <svg-icon icon-class="renwu"></svg-icon>
            <span slot="title">任务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">任务概览</el-menu-item>
            <el-menu-item index="2-2">新建任务</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <svg-icon icon-class="xitong"></svg-icon>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">系统管理</el-menu-item>
            <el-menu-item index="3-2">审计日志</el-menu-item>
            <el-menu-item index="3-4">系统管理</el-menu-item>
            <el-menu-item index="3-2">审计日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("layout");
export default {
  name: "SiderBar",
  components: {
    /* 按需加载组件 */
    // demo: () => import('@/pages/')
  },
  props: {},
  /**
   * @description
   * @returns {any}
   */
  data() {
    return {
      // 菜单导航对应的路由
      routerMap: {
        "1-1": { path: "/dashboard" },
        "2-1": { path: "/taskOverview" },
        "2-2": { path: "/createTask" },
        "3-1": { path: "/userManage" },
        "3-2": { path: "/auditLog" },
        "3-3": { path: "/selfManage" },
        "3-4": { path: "/sysManage" }
      }
    };
  },
  computed: {
    ...mapState([
      "isCollapse",
      "defaultActive", // 默认激活的菜单
      "defaultOpeneds" //默认打开的子菜单
    ])
  },
  watch: {},
  methods: {
    ...mapMutations([
      "setDefaultActive",
      "spliceDefaultOpeneds",
      "unshiftDefaultOpeneds"
    ]),
    /**
     * @description 菜单激活回调
     * @param {any} index 选中菜单项的 index
     * @param {any} indexPath 选中菜单项的 index path
     */
    onSelect(index) {
      let { path } = this.routerMap[index];
      this.setDefaultActive(index);
      this.$router.push({ path });
    },
    /**
     * @description sub-menu 展开的回调
     * @param {any} index 打开的 sub-menu 的 index
     * @param {any} indexPath 打开的 sub-menu 的 index path
     */
    onSubMenuOpen(index, indexPath) {
      this.unshiftDefaultOpeneds("" + indexPath);
    },
    /**
     * @description sub-menu 关闭的回调
     * @param {any} index 收起的 sub-menu 的 index
     * @param {any} indexPath 收起的 sub-menu 的 index path
     */
    onSubMenuClose(index, indexPath) {
      console.log(index, indexPath);
      this.spliceDefaultOpeneds("" + indexPath);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
/* 重写el-menu样式 */
/* 去除el-menu右侧边框 */
.el-menu {
  border-right: none;
}
/* siderbar展开后的宽度 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  width: 200px;
}
/* 选中的菜单背景颜色 */
.el-menu-item.is-active {
  background-color: rgba(24, 144, 255, 0.2) !important;
}
/* 子菜单的背景颜色 */
.el-submenu .el-menu-item {
  background-color: rgba(47, 51, 58, 0.53) !important;
}
/* 管理侧边栏横向滚动条 */
.siderbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
/* 重写animate.css fadeout延时 */
.fadeOut.delay {
  animation-duration: 0.6s;
}
</style>

<style lang="stylus" scoped>
.siderbar {
  line-height: 1;

  .c-scrollbar {
    height: calc(100% - 75px);
  }

  .logo-container {
    text-align: center;

    img {
      width: 180px;
    }
  }
}

.svg-icon {
  margin-right: 10px;
  vertical-align: middle;
  font-size: 28px;
}

.svg-logo {
  padding-bottom: 20px;
  width: 180px;
  height: 55px;
  transition: width height 0.2s;
}
</style>
