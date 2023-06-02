import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 服务端中使用vuex ，将数据保存到全局变量中 window，浏览器用服务端渲染好的数据，进行替换
export default ()=>{
    let store = new Vuex.Store({
        state:{
            name:'zhufeng'
        },
        mutations:{
            changeName(state,payload){
                state.name = payload
            }
        },
        actions:{
            changeName({commit}){// store.dispatch('changeName')
                return new Promise((resolve,reject)=>{
                    setTimeout(() => {
                        commit('changeName','jiangwen');
                        resolve();
                    }, 5000);
                })
            }
        }

    });

    if(typeof window!='undefined' && window.__INITIAL_STATE__){
        // 浏览器开始渲染了

        // 将后端渲染好的结果 同步给前端  vuex中核心方法
        store.replaceState(window.__INITIAL_STATE__); // 用服务端加载好的数据替换掉
    }
    return store;
}