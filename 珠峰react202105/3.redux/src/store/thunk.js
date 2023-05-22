/**
 * thunk中间件可以让我们派发函数 funtion
 * 默认情况下，我们只能派发普通对象
 */
 function thunk({getState,dispatch}){
    return function(next){//为了实现中间件的级联，调用下一个中间件
      return function(action){//这才就是我们改造后的dispatch方法了
         if(typeof action === 'function'){
            return action(dispatch,getState);
         }
         return next(action);
      }
    }
  }
  export default thunk;