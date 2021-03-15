/*
 * @LastEditTime: 2021-03-15 22:31:20
 * @Description:
 * @Date: 2019-11-21 14:32:00
 * @Author: @虾哔哔
 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vant from "vant";

// import "normalize.css";
import "vant/lib/index.css";
// import "animate.css";
import "csstool.css";

import request from "./api/request";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 按需加载
dayjs.locale("zh-cn"); // 全局使用简体中文
import uuid from "uuid/v1";
import xss from "xss";

Vue.prototype.$request = request;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$uuid = uuid;
Vue.prototype.$xss = xss;

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
