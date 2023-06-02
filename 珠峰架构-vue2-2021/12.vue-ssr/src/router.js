import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'
Vue.use(VueRouter);// 内部会提供两个全局组件 Vue.component()


// 每个人访问服务器都需要产生一个路由系统

export default ()=>{
    let router = new VueRouter({
        mode:'history',
        routes:[
            {path:'/',component:Foo},
            {path:'/bar',component:Bar}, // 懒加载，根据路径动态加载对应的组件
            {path:'*',component:{
                render:(h)=>h('div',{},'404')
            }}
        ]
    });
    return router;
}




//前端的路由的两种方式 hash  history

// hash # 

// 路由就是根据路径的不同渲染不同的组件 hash值特点是hash值变化不会导致页面重新渲染，我们可以监控hash值的变化 显示对应组件 （可以产生历史记录）  hashApi 特点就是丑  （服务端获取不到hash值，）

// historyApi H5的api  漂亮。问题是刷新时会产生404。 