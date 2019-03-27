import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";

import app from "./modules/app";
import layout from "./modules/layout";
import permission from "./modules/permission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { app, permission, layout },
  getters
});
