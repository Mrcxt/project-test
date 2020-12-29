import { createStore } from 'vuex'
import modulesAutoInstall from "./modulesAutoInstall";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: modulesAutoInstall()
})