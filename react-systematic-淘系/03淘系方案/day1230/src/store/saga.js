import {
    take, takeLatest, throttle, debounce,
    call, apply, fork, delay, put, select, all, cancel
} from 'redux-saga/effects';
import * as TYPES from './action-types';

/* 工作区域 */
const workingCount = function* workingCount(action) {
    yield delay(2000);
    yield put({
        type: TYPES.DEMO_COUNT,
        payload: action.payload
    });
};
const workingSupport = function* workingSupport() {
    yield delay(1000);
    yield put({
        type: TYPES.VOTE_SUP
    });
};
const workingOppose = function* workingOppose() {
    yield delay(1000);
    yield put({
        type: TYPES.VOTE_OPP
    });
};

/* 创建监听器，监听派发的异步任务 */
const saga = function* saga() {
    /* while (true) {
        let action = yield take(`${TYPES.DEMO_COUNT}@SAGA@`);
        yield fork(workingCount, action);
        yield fork(workingSupport, action);
        yield fork(workingOppose, action);
    } */
    yield takeLatest(`${TYPES.DEMO_COUNT}@SAGA@`, workingCount);
    yield takeLatest(`${TYPES.VOTE_SUP}@SAGA@`, workingSupport);
    yield takeLatest(`${TYPES.VOTE_OPP}@SAGA@`, workingOppose);
};
export default saga;