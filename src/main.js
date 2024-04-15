import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import '@/permission'
import *as echarts from 'echarts'
import 'lib-flexible/flexible'
import sideNav from './components/sideNav.vue';  //全局注册侧边导航组件
Vue.component('sideNav', sideNav)

Vue.prototype.echarts=echarts
// Vue.config.productionTip = false

Vue.use(ElementUI);



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
