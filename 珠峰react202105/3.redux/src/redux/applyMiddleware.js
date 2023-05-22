import compose from './compose';
/**
 * 应用中间件 middlewares=[promise,thunk,logger]
 * @param {*} logger 第一个中间件
 * @returns 
 */
function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducer,preloadedState) {
            //是创建计算改造后的store.dispatch的过程
            let store = createStore(reducer,preloadedState);//先创建一个仓库
            let dispatch;
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            }
            //chain=[promise,thunk,logger]
            let chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
/**
 * let chain = [promise,thunk,logger]; (next)=>action=>{}
 * compose(...chain)
 * function fn(store.dispatch){
 * 
 * }
 * dispatch = compose(...chain)(store.dispatch);
 * 
 */

export default applyMiddleware;