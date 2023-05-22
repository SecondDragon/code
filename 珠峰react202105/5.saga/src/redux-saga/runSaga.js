
import * as effectTypes from './effectTypes';
import {TASK_CANCEL} from './symbols';
function runSaga(env, saga,callback) {
    let task = {cancel:()=>next(TASK_CANCEL)};
    let { channel, dispatch } = env;
    //saga可能是一个生成器，也可能是一个迭代器
    let it =  typeof saga[Symbol.iterator] === 'function'?saga:saga();
    function next(val,isError) {
        let result;
        if(isError){
            result = it.throw(val);//立刻停止saga,表示出错了
        }else if(val===TASK_CANCEL){
            result=it.return(val);//立刻停止saga
        }else{
            result = it.next(val);;
        }
        let { value: effect, done } = result;
        if (!done) {
            if (typeof effect[Symbol.iterator] === 'function') {
                runSaga(env, effect);//开始了一个子进行执行worker saga,当前saga继续执行
                next();//调用next就让当前saga继续执行，不调用就卡在这里
            }else if(typeof effect.then === 'function'){
                effect.then(next);
            } else {
                //根据不同的effect进行不同的处理
                //next(effect);
                switch (effect.type) {
                    case effectTypes.TAKE:
                        //effect={type:'TAKE',actionType:'ASYNC_ADD'}
                        channel.once(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        //effect={type:'PUT',action:{ type: actionTypes.ADD }}
                        dispatch(effect.action);//put派发action之后就继续下执行了
                        next();
                        break;
                    case effectTypes.FORK:
                        //子进程其实是一个比喻
                        let forkTask = runSaga(env, effect.saga);//开启子进程执行effect这个saga
                        next(forkTask);//当前的saga继续执行
                        break; 
                    case effectTypes.CALL:
                        //子进程其实是一个比喻
                        effect.fn(...effect.args).then(next);
                        break;  
                    case effectTypes.CPS:
                        //子进程其实是一个比喻
                        effect.fn(...effect.args,(err,data)=>{
                            if(err){
                                next(err,true);
                            }else{
                                next(data);
                            }
                        });
                        break;  
                    case effectTypes.ALL:
                        let effects = effect.effects;
                        let result = [];//存放结果 的数组
                        let completeCount = 0;//完成任务的数量
                        effects.forEach((it,index)=>{
                            runSaga(env,it,(itResult)=>{
                                result[index]=itResult;
                                if(++completeCount === effects.length){
                                    next(result);//可以让当前的 saga继续执行了
                                }
                            });
                        });
                        break;    
                    case effectTypes.CANCEL: 
                         effect.task.cancel();
                         next(); 
                         break;               
                    default:
                        break;
                }
            }
        }else{
            callback&&callback(effect);
        }
    }
    next();
    return task;
}
export default runSaga;