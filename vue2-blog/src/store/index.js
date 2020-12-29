/*
 * @LastEditTime: 2019-12-16 15:09:44
 * @Description:
 * @Date: 2019-12-04 16:19:28
 * @Author: @虾哔哔
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedstate from "vuex-persistedstate";
import modulesAutoInstall from "./modulesAutoInstall";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: modulesAutoInstall(), // 自动注册
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedstate({
      key: "ebot_fe_vuex",
      storage: window.sessionStorage
    })
  ]
});
