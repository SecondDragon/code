import { createApp } from 'vue/dist/vue.esm-bundler'

import App from './components/App.vue'
import ProductItem from "./components/ProductItem.vue"

// const App = {
//   template: `<h2>{{title}}</h2>`,
//   data() {
//     return {
//       title: "我也是标题"
//     }
//   }
// }

const app = createApp(App)

// 全局注册
// app.component("product-item", ProductItem)

app.mount('#app')
