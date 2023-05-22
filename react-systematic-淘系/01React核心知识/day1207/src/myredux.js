import _ from './assets/utils';

/* 实现redux的部分源码 */
export const createStore = function createStore(reducer) {
    if (typeof reducer !== 'function') throw new Error("Expected the root reducer to be a function");

    let state, //存放公共状态
        listeners = []; //事件池

    /* 获取公共状态 */
    const getState = function getState() {
        // 返回公共状态信息即可
        return state;
    };

    /* 向事件池中加入让组件更新的方法 */
    const subscribe = function subscribe(listener) {
        // 规则校验
        if (typeof listener !== "function") throw new TypeError("Expected the listener to be a function");
        // 把传入的方法(让组件更新的办法)加入到事件池中「需要做去重处理」
        if (!listeners.includes(listener)) {
            listeners.push(listener);
        }
        // 返回一个从事件池中移除方法的函数
        return function unsubscribe() {
            let index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    };

    /* 派发任务通知REDUCER执行 */
    const dispatch = function dispatch(action) {
        // 规则校验
        if (!_.isPlainObject(action)) throw new TypeError("Actions must be plain objects");
        if (typeof action.type === "undefined") throw new TypeError("Actions may not have an undefined 'type' property");

        // 把reducer执行，传递：公共状态、行为对象；接收执行的返回值，替换公共状态；
        state = reducer(state, action);

        // 当状态更改，我们还需要把事件池中的方法执行
        listeners.forEach(listener => {
            listener();
        });

        return action;
    };

    /* redux内部会默认进行一次dispatch派发，目的：给公共容器中的状态赋值初始值 */
    const randomString = () => Math.random().toString(36).substring(7).split('').join('.');
    dispatch({
        // type: Symbol()
        type: "@@redux/INIT" + randomString()
    });

    // 返回创建的STORE对象
    return {
        getState,
        subscribe,
        dispatch
    };
};