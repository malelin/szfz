/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: layou组件的vuex数据
 * @Date: 2019-03-27 14:39:26
 * @LastEditTime: 2019-04-25 11:07:43
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
    }
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
        debugger;
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
    }
  },
  actions: {}
};

export default layout;
