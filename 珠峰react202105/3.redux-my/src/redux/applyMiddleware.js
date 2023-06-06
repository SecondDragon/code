import compose from "./compose";
/**
 * 应用中间件 middlewares=[promise,thunk,logger]
 * @param {*} logger 第一个中间件
 * @returns
 */
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      //是创建计算改造后的store.dispatch的过程
      let store = createStore(reducer, preloadedState); //先创建一个仓库
      let dispatch;
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };
      //middlewares= [promise,thunk,logger]  三个都是第一层函数
      //chain=[promise,thunk,logger]      三个都是第二层函数
      // 但是 所有插件 都是三层函数  先用middlewares.map(middleware => middleware(middlewareAPI));脱掉第一层函数 给 thunk, promise, logger 都加入了闭包{getState,dispatch}
      // 但是这是dispatch的真正意义还不明

      let chain = middlewares.map((middleware) => middleware(middlewareAPI));

      // 这个 compose 会先执行最后一个 即数组的最后一项函数，也就是 logger插件的第二层函数
      //   把真实的 store.dispatch 传给 logger插件的第二层 函数的 next
      // 所以只有  logger 的第三层函数内部的 next 真正调用了真实的 store.dispatch
      // 同时把 logger的 第三层函数作为结果（注意此时第三层函数没有被调用）传给thunk的 第二层 作为 thunk第三层 的 next

      //  执行thunk的 第二层 把 thunk 的 第三层函数作为结果 （注意此时第三层函数没有被调用） 传给 promise 的第二层函数 作为  promise第三层 的 next

      //   执行promise的 第二层  把 promise 的 第三层函数作为结果 传给 dispatch
      //  这时 所有函数都能联系到的闭包，第一层函数的参数 middlewareAPI 的 dispatch: (action) => dispatch(action),函数也就确定下来了
      //   所以可以知道 一旦在 任意一个 插件中使用了dispatch 执行了 promise的第三层函数  promise的第三层函数又必须执行 next 于是 thunk、logger的第三层函数依次被执行

        //这里可能会出现一个bug，那就是 如果 logger中（也就是最后一个插件） 第三层调用了最外层的dispatch就会死循环
      dispatch = compose(...chain)(store.dispatch);
      // applyMiddleware(thunk, promise, logger)
      //

      return {
        ...store,
        dispatch,
      };
    };
  };
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
