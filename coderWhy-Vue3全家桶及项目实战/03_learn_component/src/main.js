import { createApp } from 'vue'

// import { sum } from './utils/math'

// import App from './01_组件的嵌套使用/App.vue'
// import App from './02_组件通信-父传子/App.vue'
// import App from './03_组件通信-子传父/App.vue'
// import App from './04_组件通信-案例练习/App.vue'
// import App from './05_组件插槽-基本使用/App.vue'
// import App from './06_组件插槽-具名插槽/App.vue'
// import App from './07_组件插槽-作用域插槽/App.vue'

// import App from './08_Provide和Inject/App.vue'
// import App from './09_事件总线的使用/App.vue'
// import App from './10_生命周期函数演练/App.vue'
// import App from './11_ref获取元素组件/App.vue'
// import App from './12_动态组件的使用/App.vue'
// import App from './13_Keep-Alive的使用/App.vue'
// import App from './14_异步组件的使用/App.vue'
// import App from './15_组件的v-model/App.vue'
import App from './16_组件的混入Mixin(了解)/App.vue'

// sum(20, 30)
// import函数可以让webpack对导入文件进行分包处理
// import("./utils/math").then(res => {
//   res.sum(20, 30)
// })

const app = createApp(App)
app.mixin({
  created() {
    console.log("mixin created")
  }
})
app.mount('#app')
