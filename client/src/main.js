import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
window.$ = $;
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import wangEditor from 'wangeditor';
window.wangEditor = wangEditor;// 富文本挂载到window上
Vue.config.productionTip = false;// 阻止启动生产消息
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
