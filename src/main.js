// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axiosUtil from '@/utils/axiosUtil';
import store from './store';
import {
  initMenu
} from './utils/menus.js';
import 'font-awesome/css/font-awesome.min.css';
import '@/assets/testfont.css';
// 插件
Vue.prototype.$http = axiosUtil
Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next();
  } else {
    if (window.sessionStorage.getItem('user')) {
      initMenu(router, store);
      next();
    } else {
      next();
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
