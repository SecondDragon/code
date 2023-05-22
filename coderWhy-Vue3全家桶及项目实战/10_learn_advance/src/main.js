import { createApp } from 'vue'
// import App from './01_自定义指令/App.vue'
// import App from './02_内置组件补充/App.vue'
// import App from './03_安装插件/App.vue'
// import App from './04_Render函数/App.vue'
// import App from './05_JSX的语法/App.vue'
import App from './06_过渡动画/App.vue'

// import useDirectives from "./01_自定义指令/directives/index"
import directives from "./01_自定义指令/directives/index"

// import router from "./router"

// 自定义指令的方式一:
// const app = createApp(App)
// // useDirectives(app)
// directives(app)
// app.mount('#app')

// 自定义指令的方式二:使用插件
createApp(App).use(directives).mount("#app")

