import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index.js';
import * as Types from '@/store/action-types';
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{ // 公共的状态
        tokens:[]
    },
    mutations:{
        [Types.SET_TOKEN](state,token){
            // 我们希望状态可以被追踪 
            state.tokens = [...state.tokens,token]; // 存储token，页面切换可以让token依次执行
        },
        [Types.CLEAR_TOKEN](state){
            state.tokens.forEach(token=>token()); // 执行所有的取消方法，都调用一下
            state.tokens = []; // 清空列表
        }
    },
    modules:{
        ...modules
    }
})
window.store = store
export default store;