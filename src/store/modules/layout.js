/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: layou组件的vuex数据
 * @Date: 2019-03-27 14:39:26
 * @LastEditTime: 2019-03-27 16:19:50
 */
// import Cookies from "js-cookie";

const layout = {
  namespaced: true,
  state: {
    // 是否折叠侧边栏
    isCollapse: false
  },
  mutations: {
    /**
     * @description 切换侧边栏显示
     * @param {*} state
     */

    toggleISCollapse(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {}
};

export default layout;
