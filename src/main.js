import Vue from 'vue'
import App from './App.vue'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import * as echarts from 'echarts'

Vue.use(echarts)
Vue.prototype.$echarts = echarts;
require("./mock/index.js")
Vue.use(elementUi)
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
