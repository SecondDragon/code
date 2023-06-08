import { createApp } from 'vue';
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue';



createApp(App).mount('#app');




// 1.我们先自己构造一些假数据 能实现根据位置渲染内容
// 2.配置组件对应的映射关系  {preview:xxx,render:xxx}