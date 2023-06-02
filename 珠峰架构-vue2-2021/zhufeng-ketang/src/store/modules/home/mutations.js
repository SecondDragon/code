import * as Types from '@/store/action-types'
const homeMutations = {
    [Types.SET_CATEGORY](state,payload) { // 修改分类状态
        state.category = payload;
    },
    [Types.SET_SLIDES](state,slides){
        state.slides = slides; // 更新数据
    },
    
}
export default homeMutations;
