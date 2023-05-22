import {
    take, takeEvery, takeLatest, throttle, debounce,
    call, apply, fork, delay, put, select, all
} from 'redux-saga/effects';
import * as TYPES from './action-types';

/* 模拟了两个接口 */
const api = {
    queryData(id, name) {
        return new Promise(resolve => {
            setTimeout(() => {
                let result = {
                    code: 0,
                    data: [10, 20, 30, 40]
                };
                resolve(result);
            }, 2000);
        });
    },
    queryBanner() {
        return new Promise(resolve => {
            setTimeout(() => {
                let result = {
                    code: 0,
                    data: '轮播图数据'
                };
                resolve(result);
            }, 1000);
        });
    }
};

/* 创建执行函数，在任务被监听后，去做异步操作「Generator函数」 */
const workingCount = function* workingCount(action) {
    /* 
    // let { num } = yield select(state => state.demo);
    yield delay(2000);
    // let { code, data } = yield call(api.queryData, 108, '珠峰');
    // let { code, data } = yield apply(null, api.queryData, [108, '珠峰']);
    yield put({
        type: TYPES.DEMO_COUNT,
        payload: action.payload
    }); 
    */

    /* 
    // 基于yield call处理，实现的是标准的串行效果：上一个请求成功，才会发送下一个请求
    let { data } = yield call(api.queryData, 100, '珠峰培训');
    console.log('第一个请求成功:', data);
    let { data: data2 } = yield call(api.queryBanner);
    console.log('第二个请求成功:', data2); 
    */

    /* 
    // 如果想实现并行效果，则基于yield all处理：等待所有请求都成功，再向下继续执行
    let { home, banner } = yield all({
        home: call(api.queryData, 100, '珠峰培训'),
        banner: call(api.queryBanner)
    });
    console.log(home, banner); //分别获取了两个请求成功的结果 
    */
};

/* 创建监听器，监听派发的任务「Generator函数」 */
const saga = function* saga() {
    yield takeLatest(`${TYPES.DEMO_COUNT}@SAGA@`, workingCount);
};
export default saga;