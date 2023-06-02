import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

let vm = new Vue({
  name:'root',
   store, // 此store的目的是让所有组件都能访问到store对象
  render: h => h(App)
}).$mount('#app')


// 所有组件都能执行的方法 Vue.mixin({beforeCreate}), 拿到store挂载到自己的身上
