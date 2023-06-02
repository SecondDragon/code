import Vue from 'vue'
import Vuex from '@/vuex'
// import Vuex from 'vuex'
// import logger from 'vuex/dist/logger.js'
Vue.use(Vuex)
// // new Vue

// function logger() {
//     return function(store) {
//         let prevState = JSON.stringify(store.state);
//         store.subscribe((mutation, state) => { // 所有的更新操作都基于mutation （状态变化都是通过mutation的）
//             // 如果直接手动的更改状态 此scbscribe是不会执行  commit()
//             console.log('prevState:' + prevState);
//             console.log('mutation:' + JSON.stringify(mutation));
//             console.log('currentState:' + JSON.stringify(state));
//             prevState = JSON.stringify(state);

//         })
//     }
// }
function persists() {
    return function(store) { // vuex-persists
        let localState = JSON.parse(localStorage.getItem('VUEX:STATE'))
        if (localState) {
            store.replaceState(localState);
        }

        // 和 mutation挂钩的
        store.subscribe((mutation, rootState) => { // 状态变化了 想做一些其他事 
            // 状态发生变化就存localStorage中
            // 防抖
            localStorage.setItem('VUEX:STATE', JSON.stringify(rootState));
        });
    }
}
let store = new Vuex.Store({ // vuex持久化插件？
    plugins: [
        // logger()
        persists() // 每次状态变化都可以存入到localStorage中
    ],
    state: { // state = > data
        name: 'zhufeng',
        age: 12
    },
    mutations: { // method  commit 同步更改状态
        changeAge(state, payload) {
            state.age += payload
        }
    },
    actions: { // 异步操作 调用api接口 dispatch， 多次commit mutation  
        changeAge({ commit }, payload) {
            setTimeout(() => {
                commit('changeAge', payload);
            }, 1000);
        }
    },
    getters: { // 计算属性
        myAge(state) {
            return state.age + 10
        }
    },
    strict: true, // 如果不是在mutation中操作的状态会发生警告
    modules: { // 进行模块分割
        // namespaced 能解决子模块和父模块的命名冲突文件 ，相当于增加了一个命名空间
        // 如果没有namespaced 默认getters都会被定义到父模块上，
        // mutations 会被合并在一起， 最终一起调用，有了命名空间就没有这个问题了
        // 子模块的名字不能和父模块中的状态重名
        a: {
            namespaced: true,
            state: {
                name: 't1',
                age: 10
            },
            // 所有的getters 都会被合并到跟上
            getters: { // 首页一个模块 home 订单页一个模块 order  用户一个模块 user
                myAge(state) {
                    return state.age + 20;
                }
            },
            mutations: {
                changeAge(state, payload) {
                    state.age += payload
                }
            },
            modules: {
                c: {
                    namespaced: true,
                    state: {
                        age: 100
                    },
                    mutations: {
                        changeAge(state, payload) {
                            state.age += payload
                        }
                    },
                    modules: {
                        d: {
                            namespaced: true,
                            state: {
                                age: 100
                            },
                        }
                    }
                }
            }
        },

    }
})

export default store;