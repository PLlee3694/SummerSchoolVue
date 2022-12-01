import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import DataV from '@jiaminghi/data-view'
import './assets/icon/iconfont.css'
import * as  echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.use(DataV)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$url='http://180.76.235.163:8088'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')