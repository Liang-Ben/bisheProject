// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import '../static/font_3189568_y4vwvsds3co/iconfont.css'

import store from '../store'

Vue.config.productionTip = false
Vue.use(element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  components: { App },
  template: '<App/>'
})
