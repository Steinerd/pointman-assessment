import Vue from "vue";
import App from "./App.vue";
import VueLogger from "vuejs-logger";

const isProduction = window.process.env.NODE_ENV === "production";
const logOptions = {
  isEnabled: false,
  logLevel: isProduction ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: false,
  showMethodName: false,
  separator: "|",
  showConsoleColors: true
};
Vue.use(VueLogger, logOptions);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

window.$log = Vue.$log;
