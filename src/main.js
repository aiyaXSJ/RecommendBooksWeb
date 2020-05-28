import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入依赖并全局注册
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:3000/'
Vue.prototype.$axios = axios

import qs from 'qs'
Vue.prototype.$qs = qs
// 引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入局部样式
// import {Button} from 'element-ui';
// Vue.use(Button);

// 导入全局样式表
import './assets/css/global.css'
// 导入图标库
import './assets/fonts/iconfont.css'

import less from 'less'
Vue.use(less)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
