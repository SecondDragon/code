
//可以驱动saga执行 co
import runSaga from './runSaga';
//channel用来实现我们发布订阅
import stdChannel from './channel';
const channel = stdChannel();
function createSagaMiddleware(){
    let boundRunSaga;
    function sagaMiddleware({getState,dispatch}){
        boundRunSaga = runSaga.bind(null,{channel,dispatch,getState});
        return function(nextDispatch){//原生的或者说原始的store.dispatch
            //如果你调用store.dispatch 肯定会走nextDispatch
            return function(action){//这就改造后的store.dispatch
                const result = nextDispatch(action);
                channel.trigger(action);
                return result;
            }
        }
    }
    sagaMiddleware.run = (saga)=>boundRunSaga(saga);
    return sagaMiddleware;
}
export default createSagaMiddleware;