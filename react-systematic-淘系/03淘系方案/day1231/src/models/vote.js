const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};
export default {
    namespace: 'vote',
    state: {
        supNum: 10,
        oppNum: 5
    },
    reducers: {
        support(state) {
            return {
                ...state,
                supNum: state.supNum + 1
            };
        },
        oppose(state) {
            return {
                ...state,
                oppNum: state.oppNum + 1
            };
        }
    },
    effects: {
        supportAsync: [
            function* (_, { call, put }) {
                yield call(delay);
                yield put({ type: 'support' });
            },
            { type: 'takeLatest' }
        ],
        *opposeAsync(_, { call, put }) {
            yield call(delay, 2000);
            yield put({ type: 'oppose' });
        }
    },
    /*
     这个板块的Model是加载页面时就被立即注册的 
       + subscriptions中写的方法，在页面一加载的时候，就会把所有设定的方法执行
       + 方法就是普通函数「不能是Generator函数」
         + 传递的实参对象中具备 history/dispatch 两个属性
         + history：包含路由跳转和监听的history对象
         + dispatch：进行派发的方法
       + 如果想页面一加载「或者是指定的某个条件下」，我们就想从服务器异步获取数据，修改此模块的状态值，则可以写在subscriptions中！！
     */
    subscriptions: {
        // 方法只有页面一加载的时候，订阅执行一次，在后期路由切换中，不再执行
        /* async setup({ history, dispatch }) {
            console.log('VOTE-SETUP');
            await delay(2000);
            dispatch({
                type: 'support'
            });
        } */
        // 需求改变了一下：我们想的是，在页面第一次/重新加载的时候，只有进入Vote这个组件，我们在voteModel中写的setup，以及其内部的操作，才让其生效！！
        setup({ history, dispatch }) {
            // 在Model没有懒加载的情况下，我们可以让setup函数在页面第一次加载的过程中，就订阅到事件池里，并且通知执行！！我们在setup中基于history.listen创建路由跳转监听器：第一次会执行，以后每一次路由切换也会执行！！
            let unlisten = history.listen(async (location) => {
                let { pathname } = location;
                if (pathname === '/') {
                    await delay(2000);
                    dispatch({
                        type: 'support'
                    });
                    // 返回的函数就是移除此监听器的操作
                    unlisten();
                }
            });
        }
    }
};