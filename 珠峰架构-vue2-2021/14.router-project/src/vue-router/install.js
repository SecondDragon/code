
export let Vue;
import RouterLink from './components/link';
import RouterView from './components/view'

 export default function install(_Vue){ // 谁用我这个插件 版本就是谁
    Vue = _Vue;
    // 给所有的组件统一增加$route 和 $route 属性
    Vue.mixin({ //  _router 共享给每个人的
        beforeCreate(){
            // 父 store  子 拿父store  孙子 拿子的store
            // 我给根实例增加一个_router属性
            // 所有人都拿到根上的_router
            if(this.$options.router){
                // 根组件
                this._router = this.$options.router;
                this._routerRoot = this; // 表示根组件上有一个唯一的标识叫_routerRoot 指向了自己

                // 初始化路由的逻辑 只初始化一次
                this._router.init(this); // 整个应用的根
            }else{
                // 子 孙子
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
            // 所有组件都有_routerRoot._router获取路由的实例
        }
    })
    // _routerRoot 是根实例  根实例上有_router属性
    // 所有的组件都可以获取根 _routerRoot, 获取根的属性 _routerRoot._router
    Object.defineProperty(Vue.prototype,'$router',{
        get(){

        }
    })
    Object.defineProperty(Vue.prototype,'$route',{
        get(){

        }
    });
    Vue.component('router-link',RouterLink)
    Vue.component('router-view',RouterView)
}
