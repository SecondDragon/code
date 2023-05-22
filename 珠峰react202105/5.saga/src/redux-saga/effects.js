import * as effectTypes from './effectTypes';
/**
 * 生成指令对象的工厂函数
 * @param {*} actionType  ASYNC_ADD
 * @returns 
 */
export function take(actionType){
    //这是一个用来发送给saga中间件的指令对象，
    return {type:effectTypes.TAKE,actionType};
}

export function put(action){
    return {type:effectTypes.PUT,action};
}
/**
 * 开启一个子进程运行saga,为了不阻塞当前的进程
 * @param {*} saga 
 * @returns 
 */
export function fork(saga){
    return {type:effectTypes.FORK,saga};
}
/**
 * 当监听到某个动作类型的时候，开启新的子进程执行saga
 * @param {*} actionType 动作类型
 * @param {*} saga 
 */
export function takeEvery(actionType,saga){
    function * takeEveryHelper(){
        while(true){
            let action = yield take(actionType);//监听或者 说等待actionType动作被派发
            yield fork(function*(){
                yield saga(action);
            });//开启一个新的孙子进程执行saga
        }
    }
    return fork(takeEveryHelper);
    //{type:effectTypes.FORK,saga:takeEveryHelper};
}

export function call(fn,...args){
    return {type:effectTypes.CALL,fn,args};
}

export function cps(fn,...args){
    return {type:effectTypes.CPS,fn,args};
}

export function all(effects){
    return {type:effectTypes.ALL,effects};
}

export function cancel(task){
    return {type:effectTypes.CANCEL,task};
}
function delayP(ms){
    const promise = new Promise(resolve=>{
        setTimeout(resolve,ms);
    });
    return promise;
}
export const delay = call.bind(null,delayP);
//delay(fn,1000)=>{type:"CALL",fn:delayP,args} args=[1000]