import store from "../store"
import * as Types from '@/store/action-types'
export default {
    // 此字段只是给自己看的没有任何实际意义
    'clear_token': (to, from, next) => {
        // whiteList 
        store.commit(Types.CLEAR_TOKEN); // 清空token
        next();
    },
    'login_permission': async (to, from, next) => {
        // 有些公司 直接 有token 就是登录了 ，没token 就没登陆

        // 用户是否需要登录才能访问的标识
        let needLogin = to.matched.some(item => item.meta.needLogin);
        // 如果vuex中有值 我就认为你当前登录过了
        if (!store.state.user.hasPermission) { // 用户刷新token在 但是vuex中的数据丢了
            // 返回了一个isLogin字段表示用户是否登录过了
            let isLogin = await store.dispatch(`user/${Types.VALIDATE}`);
            if(needLogin){
                if(!isLogin){
                    next('/login'); // 需要登录但是没登陆
                }else{
                    next(); // 需要登录 也登录了
                }
            }else{ //不需要登录
                if(to.name == 'login'){  // 访问的是登陆页面
                    if(!isLogin){
                        next();
                    }else{
                        next('/profile')
                    }
                }else{
                    next();
                }
            }
        }else{
            if(to.name == 'login'){
                next('/profile'); // 登录了访问登录页
            }else{
                next();
            }
        }
    },
    'menu-permission':async (to,from,next)=>{
        // 这里需要对权限进行处理  动态的添加路由
        if(store.state.user.hasPermission){ // 1.要求用户登录，才能拿去菜单的权限
            if(!store.state.user.menuPermission){ // 没菜单权限 才需要处理
                await store.dispatch(`user/${Types.ADD_ROUTE}`); // 路由动态加载，此时组件时异步加载 ()=>  我希望等待组件加载完毕后跳转过去
                next({...to,replace:true}); // 页面重新跳了一次 组件也ok了 hack /home
            }else{
                next();
            }
        }else{
            next();
        }
    }
}