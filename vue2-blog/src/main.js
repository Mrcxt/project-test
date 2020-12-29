/*
 * @LastEditTime: 2020-04-16 17:53:11
 * @Description: 
 * @Date: 2020-04-16 15:30:37
 * @Author: @虾哔哔
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./components/baseComponents/baseComponents.js"; // 自动化注册全局组件


Vue.config.productionTip = false

import "normalize.css";


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')