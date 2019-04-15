import Vue from "vue";
import Vuex from "vuex";
//vuex数据持久化
import createPersistedState from "vuex-persistedstate";
//根getters
import getters from "./getters";
// vuex模块
import app from "./modules/app";
import layout from "./modules/layout";
import permission from "./modules/permission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { app, permission, layout },
  getters,
  plugins: [createPersistedState()]
});
