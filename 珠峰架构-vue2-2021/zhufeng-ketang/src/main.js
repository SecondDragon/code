import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker' // serviceworker的配置文件 pwa 离线缓存-》manifest + sw.js  
import router from './router'
import store from './store'
import 'lib-flexible'; // 对应设置根的字体


// 指令
import directives from '@/utils/directives';

// keys values entries
Object.entries(directives).forEach(([id,define])=>{
  console.log(id,define)
  Vue.directive(id,define);
})
// 过滤器


Vue.config.productionTip = false;

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
