/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: layou组件的vuex数据
 * @Date: 2019-03-27 14:39:26
 * @LastEditTime: 2019-04-08 18:30:32
 */
// import Cookies from "js-cookie";

const layout = {
  namespaced: true,
  state: {
    // 是否折叠侧边栏
    isCollapse: false,
    // 菜单导航对应的路由
    defaultActive: "1-1"
  },
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
     * @param {object} value
     */
    setDefaultActive(state, value) {
      state.defaultActive = value;
    }
  },
  actions: {}
};

export default layout;
