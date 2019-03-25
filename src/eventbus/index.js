/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: eventbus中转站
 * @Date: 2019-03-25 12:02:18
 * @LastEditTime: 2019-03-25 12:02:45
 */
import Vue from "vue";
const bus = new Vue();

const eventbus = {
  on(event, fn, once = false) {
    if (once) {
      bus.$once(event, fn);
      return false;
    }
    bus.$on(event, fn);
  },
  emit(event, data) {
    bus.$emit(event, data);
  }
};

export default eventbus;
