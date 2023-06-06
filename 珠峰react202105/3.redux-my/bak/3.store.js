
import {createStore} from '../redux';
import combinedReducer from './reducers';
let store = createStore(combinedReducer);
let dispatch = store.dispatch;
//中间件的核心原因就是重写dispatch方法，在原始的dispatch方法之前和之后加入一些自定义的逻辑
/* store.dispatch = function(action){
    console.log('prev state',store.getState());
    dispatch(action);
    console.log('next state',store.getState());
    return action;
} */
store.dispatch = function(action){
    setTimeout(()=>{
        dispatch(action);
    },1000);
    return action;
}
export default store;