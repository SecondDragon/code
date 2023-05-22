import * as actionTypes from '@/store/action-types';
import {getLessons, getSliders} from '@/api/home';
export default {
    setCurrentCategory(currentCategory: string) {
        return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
    },
    getSliders() {
        return {
            type:actionTypes.GET_SLIDERS,
            payload:getSliders()
        }    
    },
    //加载下一页的数据
    getLessons(){
        return function(dispatch:any,getState:any){
            ;(async function(){
                let {currentCategory,lessons:{hasMore,offset,limit,loading}} = getState().home;
                if(hasMore && !loading){//如果还有更多，并且当前不是处于加载中的话
                    dispatch({type:actionTypes.SET_LESSONS_LOADING,payload:true});//设置为加载中....
                    let result = await getLessons(currentCategory,offset,limit);
                    dispatch({type:actionTypes.SET_LESSONS,payload:result.data});    
                }
            })();
        }
    },
    refreshLessons(){
        return function(dispatch:any,getState:any){
            ;(async function(){
                let {currentCategory,lessons:{limit,loading}} = getState().home;
                if(!loading){//如果还有更多，并且当前不是处于加载中的话
                    dispatch({type:actionTypes.SET_LESSONS_LOADING,payload:true});//设置为加载中....
                    let result = await getLessons(currentCategory,0,limit);
                    dispatch({type:actionTypes.REFRESH_LESSONS,payload:result.data});    
                }
            })();
        }
    }
}