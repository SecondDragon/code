

import {CALL_HISTORY_METHOD} from './actions';
function routerMiddleware(history){
  return function (middlewareAPI){//{getState,dispatch}
    return function (next){//调用下一个中间件或者原始的store.dispatch
        return function(action){//action就是动作本身
            if(action.type !== CALL_HISTORY_METHOD){
                return next(action);
            }
            const {payload:{method,args}} = action;
            history[method](...args);//history.push('/');
        }
    }
  }
}
export default routerMiddleware;
/**
action = {
            type:CALL_HISTORY_METHOD,
            payload:{
             method:'push'
             args:[path]
            }
          }
 */