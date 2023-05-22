import { createApp } from 'vue' // 不支持template选项
// import { createApp } from 'vue/dist/vue.esm-bundler' // compile代码
import App from './App.vue' // vue-loader: template -> createVNode过程

import "./utils/abc/cba/nba/index"

/**
 * 1.jsconfig.json的演练
 *   作用: 给VSCode来进行读取, VSCode在读取到其中的内容时, 给我们的代码更加友好的提示.
 * 2.引入的vue的版本
 *   默认vue版本: runtime, vue-loader完成template的编译过程
 *   vue.esm-bundler: runtime + compile, 对template进行编译
 * 
 * 3.补充: 单文件Vue style是有自己的作用域
 *   style -> scoped
 * 4.补充: vite创建一个Vue项目
 */

// 元素 -> createVNode: vue中的源码来完成
// compile的代码
// const App = {
//   template: `<h2>Hello Vue3 App</h2>`,
//   data() {
//     return {}
//   }
// }

createApp(App).mount('#app')
