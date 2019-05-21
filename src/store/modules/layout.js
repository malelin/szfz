/*
 * @Author: 旺苍扛把子
 * @LastEditors: Please set LastEditors
 * @Description: layou组件的vuex数据
 * @Date: 2019-03-27 14:39:26
 * @LastEditTime: 2019-05-21 11:08:56
 */
// import Cookies from "js-cookie";

const layout = {
  namespaced: true,
  state: {
    // 是否折叠侧边栏
    isCollapse: false,
    // 菜单导航对应的路由
    defaultActive: "1-1",
    //默认打开的子菜单
    defaultOpeneds: ["1"],
    // app-content滚动条
    scrollbar: {
      top: 0
    },
    // 任务对象
    task: {
      tid: 0
    },
    // 用户信息
    userInfo: {},
    // 任务概览分页
    //   当前页
    pagination: { currentPage: 1, pageSize: 10 }
  },
  getters: {},
  mutations: {
    /**
     * @description 切换侧边栏显示
     * @param {*} state
     */

    toggleISCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    /**
     * @description 设置默认激活的侧边栏
     * @param {State} state
     * @param {string} value
     */
    setDefaultActive(state, value) {
      state.defaultActive = value;
    },
    /**
     * @description 添加激活的侧边栏子菜单
     * @param {State} state
     * @param {string} value
     */

    unshiftDefaultOpeneds(state, value) {
      if (state.defaultOpeneds.indexOf(value) === -1) {
        state.defaultOpeneds.unshift(value);
      }
    },
    /**
     * @description 清空激活的侧边栏子菜单
     * @param {*} state
     */
    clearDefaultOpeneds(state) {
      state.defaultOpeneds = [];
    },
    /**
     * @description 删除默认激活的侧边栏某个子菜单
     * @param {State} state
     * @param {string} value
     */

    spliceDefaultOpeneds(state, value) {
      let index = state.defaultOpeneds.indexOf(value);
      state.defaultOpeneds.splice(index, 1);
    },

    /**
     * @description 设置app-content滚动条距离顶部的高度
     * @param {*} state
     * @param {*} value
     */
    setScrollbarTop(state, value) {
      state.scrollbar.top = value;
    },
    /**
     * @description 设置任务id
     * @param {*} state
     * @param {*} tid
     */
    setTaskTid(state, tid) {
      state.task.tid = tid;
    },
    /**
     * @description 设置用户信息
     */
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    /**
     * @description 设置分页size
     * @param {*} pageIndex
     */
    setPageSize(state, pageSize) {
      state.pagination.pageSize = pageSize;
    },
    /**
     * @description 设置当前页
     * @param {*} state
     * @param {*} currentPage
     */
    setCurrentPage(state, currentPage) {
      state.pagination.currentPage = currentPage;
    }
  },
  actions: {}
};

export default layout;
