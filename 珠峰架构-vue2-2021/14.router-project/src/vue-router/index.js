import install, { Vue } from './install';
import {createMatcher} from './create-matcher'
import Hash from './history/hash';
import HTML5History from './history/h5';
class VueRouter {
    constructor(options = {}) {
        const routes = options.routes;
        this.mode = options.mode || 'hash';

        //  给我个路径 我就返回给你对应的记录 
        //  match匹配方法
        // addRoutes 动态添加路由 
        this.matcher = createMatcher(options.routes || []);

        // 根据模式需要初始化不同的路由系统  hash/history 底层实现不一样 ，但是使用的方式是一样的
        // hash => hash.js  => push
        // history => history.js => push
        // base

        // 每次跳转 我需要获取当前的路径 this.$router.pathname
        switch(this.mode) {
            case 'hash': // location.hash  => push
                this.history = new Hash(this)
                break
            case 'history': // pushState => push
                this.history = new HTML5History(this); 
                break

        }
    }
    match(location){
        return this.matcher.match(location);
    }
    init(app) {
        const history = this.history; // 当前管理路由的
        // hash  -》 hashchange  但是浏览器支持popstate 就优先采用popstate
        // history -> popState  性能高于hashchange 但是有兼容性问题

        // 页面初始化完毕后 需要先进行一次跳转

        // 跳转到某个路径
        const setUpListener = () =>{
            // 此事件的实现方式也不一致
            // ....
            history.setUpListener();
        }
        history.transitionTo(
            history.getCurrentLocation(), // 各自的获取路径方法
            setUpListener
        );


    }
}
VueRouter.install = install;

// node vue2 部署 linux + docker + nginx  vue3  node
// 咱们 年前上到1.31日  年后初10继续

// vue3 讲一个半月 源码 + 用法 + 组件库 + 生态 + ts
// 之前听过node的同学 年后回来就听运维课  ， vue3有录播 -> webpack -> react 
// 没学过node课的听vue3  -> node -> react -> webpack

export default VueRouter