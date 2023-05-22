/**
 * 创建仓库的方法,返回一个仓库，仓库就是一个JS对象
 * @param {*} reducer 根据老状态，和动作计算下一个新状态
 */
const createStore = (reducer, preloadedState, enhancer) => {
  debugger
  if (typeof enhancer !== 'undefined') {
    //applyMiddleware(thunk, promise, logger)(createStore)(combinedReducer,initialState);
    return enhancer(createStore)(reducer,preloadedState);
  }
  //初值已经 有值 了，那么
  let state=preloadedState;//可以存放任意的内容
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(l => l());
    return action;
  }
  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }
  dispatch({ type: '@@REDUX/INIT' });
  return {
    getState,
    dispatch,
    subscribe
  }
}
export default createStore;