import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

// 0.针对ElMessage和ElLoading等组件引入样式
// 1.全局引入样式(所有样式全部引入)
// import 'element-plus/dist/index.css'
// 2.组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
/**
 * 3.使用vite-plugin-style-import
 *   * npm install vite-plugin-style-import consola -D
 *   * 在vite.config.ts中配置
 */

// 1.全局注册element-plus: 方便和简洁
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// app.use(ElementPlus)

// 2.按需引入: 用到哪一个组件再引入
// import { ElButton } from 'element-plus'
// app.component(ElButton.name, ElButton)

// 3.图标的全局注册

const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount('#app')
