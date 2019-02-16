import Vue from 'vue'
import App from './App'
import router from './router'

// 引入css样式全局控制
import './assets/css/global.css'

// 引入element-ui
import ElementUI from 'element-ui'

// 引入图标库
import './assets/fonts/iconfont.css'

// 引入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置拦截器
axios.interceptors.request.use(
  function(config) {
    var token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios
// 给vue注册全部的标签组件和事件方法
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
