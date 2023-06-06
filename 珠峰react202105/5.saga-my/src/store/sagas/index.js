import {put,fork,delay, take,cancel} from '../../redux-saga/effects';
import * as actionTypes from '../action-types';
function * add(){
    while(true){
        yield delay(1000);
        yield put({type:actionTypes.ADD});
    }
}

function * addListener(){
    //task就是一个fork出来的子进程的任务的描述
    const task = yield fork(add);
    console.log(task);
    yield take(actionTypes.STOP);//等待STOP动作发生
    yield cancel(task);//让task停止
    console.log('goon');
}

export default function* rootSaga() {
   yield addListener();
}

/* 

//worker saga
function* add() {
    yield put({ type: actionTypes.ADD });
}
//worker saga
function* minus() {
    yield put({ type: actionTypes.MINUS });
}
export default function* rootSaga(){
    console.log('rootSaga开始执行');
    for(let i=0;i<3;i++){
        //在此监听某个动作的发生,如果有人派发ASYNC_ADD动作，当前saga会继续执行，如果没有，就卡在这
        yield take(actionTypes.ASYNC_ADD);
        console.log('此处模拟一个延迟1s');
        //派发一个真正的动作  store.dispatch({type:actionTypes.ADD})
        yield put({type:actionTypes.ADD});
        yield take(actionTypes.ASYNC_MINUS);
        console.log('此处模拟一个延迟1s');
        //派发一个真正的动作  store.dispatch({type:actionTypes.ADD})
        yield put({type:actionTypes.MINUS});
    }
    console.log('到达最大值，再点没有用了');
} */